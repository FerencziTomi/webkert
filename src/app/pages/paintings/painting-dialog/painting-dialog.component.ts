import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Painting } from '../../../shared/models/painting';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-painting-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, CommonModule, MatDialogModule],
  templateUrl: './painting-dialog.component.html',
  styleUrls: ['./painting-dialog.component.scss']
})
export class PaintingDialogComponent {
  paintingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PaintingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean, painting?: Painting }
  ) {
    this.paintingForm = this.fb.group({
      id: [data.isEdit ? data.painting?.id : null],
      name: [data.isEdit ? data.painting?.name : '', Validators.required],
      painter: [data.isEdit ? data.painting?.painter : '', Validators.required],
      year: [data.isEdit ? data.painting?.year : null, Validators.required],
      place: [data.isEdit ? data.painting?.place : '', Validators.required],
      price: [data.isEdit ? data.painting?.price : null, [Validators.required, Validators.min(0)]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.paintingForm.valid) {
      this.dialogRef.close(this.paintingForm.value);
    }
  }
}