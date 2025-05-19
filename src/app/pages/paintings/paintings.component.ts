import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { combineLatest, Subscription } from 'rxjs';
import { Painting } from '../../shared/models/painting';
import { PaintingsService } from '../../shared/services/paintings.service';

@Component({
  selector: 'app-paintings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule
  ],
  templateUrl: './paintings.component.html',
  styleUrls: ['./paintings.component.scss']
})
export class PaintingsComponent {
  paintings: Painting[] = [];
  isLogged = false;
  isLoading = false;
  private subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['name', 'painter', 'year', 'place', 'price', 'actions'];
  specialDisplayedColumns: string[] = ['name', 'painter', 'year', 'place', 'actions'];
  paintingForm!: FormGroup;

  editingPaintingId: string | null = null;

  @Input() paintingName = '';
  @Output() addingPainting = new EventEmitter<string>();

  paintingsByPainter: Painting[] = [];
  paintingsByYear: Painting[] = [];
  paintingsWithPlaceSzeged: Painting[] = [];

  constructor(
    private fb: FormBuilder,
    private paintingService: PaintingsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllPaintingData();
    this.loadPaintingsByPainter();
    this.loadPaintingsByYear();
    this.loadPaintingsWithPlaceSzeged();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  initializeForm(): void {
    this.paintingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      painter: ['', Validators.required],
      year: [0, Validators.required],
      place: ['', Validators.maxLength(200)],
      price: ['', Validators.required]
    });
  }

  loadAllPaintingData(): void {
    this.isLoading = true;

    const allPaintings$ = this.paintingService.getAllPaintings();

    const combined$ = combineLatest([
      allPaintings$,
    ]);

    const subscription = combined$.subscribe({
      next: ([allPaintings]) => {
        this.paintings = allPaintings;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading paintings:', error);
        this.isLoading = false;
        this.showNotification('Error loading paintings', 'error');
      }
    });

    this.subscriptions.push(subscription);
  }

  loadPaintingsByPainter(): void {
    this.isLoading = true;
    const sub = this.paintingService.getPaintingsByPainter().subscribe({
      next: (data) => {
        this.paintingsByPainter = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading paintings by painter', err);
        this.isLoading = false;
      }
    });
    this.subscriptions.push(sub);
  }

  loadPaintingsByYear(): void {
    this.isLoading = true;
    const sub = this.paintingService.getPaintingsByYear().subscribe({
      next: (data) => {
        this.paintingsByYear = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading paintings by year', err);
        this.isLoading = false;
      }
    });
    this.subscriptions.push(sub);
  }

  loadPaintingsWithPlaceSzeged(): void {
    this.isLoading = true;
    const sub = this.paintingService.getPaintingsWherePlaceSzeged().subscribe({
      next: (data) => {
        this.paintingsWithPlaceSzeged = data; //asd
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading paintings with unknown place', err);
        this.isLoading = false;
      }
    });
    this.subscriptions.push(sub);
  }


  savePainting(): void {
    if (this.paintingForm.valid) {
      this.isLoading = true;
      const formValue = this.paintingForm.value;
      const paintingData: Partial<Painting> = {
        name: formValue.name,
        painter: formValue.painter,
        year: formValue.year,
        place: formValue.place,
        price: formValue.price
      };

      if (this.editingPaintingId) {
        this.paintingService.updatePainting(this.editingPaintingId, paintingData)
          .then(() => {
            this.showNotification('Painting updated successfully', 'success');
            this.editingPaintingId = null;
            this.paintingForm.reset();
            this.loadAllPaintingData();
            this.loadPaintingsByPainter();
            this.loadPaintingsByYear();
            this.loadPaintingsWithPlaceSzeged();
          })
          .catch(error => {
            console.error('Error updating painting:', error);
            this.showNotification('Failed to update painting', 'error');
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        const newPainting: Omit<Painting, 'id'> = paintingData as Omit<Painting, 'id'>;

        this.paintingService.addPainting(newPainting)
          .then(() => {
            this.showNotification('Painting added successfully', 'success');
            this.paintingForm.reset();
            this.loadAllPaintingData();
            this.loadAllPaintingData();
            this.loadPaintingsByPainter();
            this.loadPaintingsByYear();
            this.loadPaintingsWithPlaceSzeged();
          })
          .catch(error => {
            console.error('Error adding painting:', error);
            this.showNotification('Failed to add painting', 'error');
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    } else {
      Object.keys(this.paintingForm.controls).forEach(key => {
        const control = this.paintingForm.get(key);
        control?.markAsTouched();
      });
      this.showNotification('Please fill in all required fields correctly', 'warning');
    }
  }

  editPainting(painting: Painting): void {
    this.editingPaintingId = painting.id;
    this.paintingForm.patchValue({
      name: painting.name,
      painter: painting.painter,
      year: painting.year,
      place: painting.place,
      price: painting.price
    });
  }

  deletePainting(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.isLoading = true;
      this.paintingService.deletePainting(taskId)
        .then(() => {
          this.loadAllPaintingData();
          this.loadPaintingsByPainter();
          this.loadPaintingsByYear();
          this.loadPaintingsWithPlaceSzeged();
          this.showNotification('Painting deleted successfully', 'success');
        })
        .catch(error => {
          console.error('Error deleting task:', error);
          this.showNotification('Failed to delete task', 'error');
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }

  private showNotification(message: string, type: 'success' | 'error' | 'warning'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [`snackbar-${type}`]
    });
  }
}