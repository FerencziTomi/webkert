import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Painting } from '../../shared/models/painting';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PaintingsService } from '../../shared/services/paintings.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaintingDialogComponent } from './painting-dialog/painting-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-paintings',
  standalone: true,
  imports: [MatListModule, CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './paintings.component.html',
  styleUrls: ['./paintings.component.scss']
})
export class PaintingsComponent {
  paintings: Painting[] = [];
  isLogged = false;

  @Input() paintingName = '';
  @Output() addingPainting = new EventEmitter<string>();

  constructor(
    private paintingsService: PaintingsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.isLogged = localStorage.getItem('isLoggedIn') === 'true';
    this.loadPaintings();
  }

  loadPaintings() {
    this.paintingsService.getAll().subscribe({
      next: (paintings) => this.paintings = paintings,
      error: (err) => console.error('Error loading paintings:', err)
    });
  }

  addPaintingToCart(pname: string) {
    this.paintingName = pname;
    this.addingPainting.emit(pname);
    this.snackBar.open(`${pname} hozzáadva a kosárhoz`, 'Bezár', { duration: 3000 });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(PaintingDialogComponent, {
      width: '500px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.paintingsService.create(result).then(() => {
          this.snackBar.open('Festmény hozzáadva', 'Bezár', { duration: 3000 });
        });
      }
    });
  }

  openEditDialog(painting: Painting): void {
    const dialogRef = this.dialog.open(PaintingDialogComponent, {
      width: '500px',
      data: { isEdit: true, painting }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.paintingsService.update(result).then(() => {
          this.snackBar.open('Festmény frissítve', 'Bezár', { duration: 3000 });
        });
      }
    });
  }

  deletePainting(id: string): void {
    if (confirm('Biztosan törölni szeretnéd ezt a festményt?')) {
      this.paintingsService.delete(id).then(() => {
        this.snackBar.open('Festmény törölve', 'Bezár', { duration: 3000 });
      });
    }
  }
}