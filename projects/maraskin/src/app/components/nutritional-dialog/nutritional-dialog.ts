import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MealViewModel } from 'cerebellum';

@Component({
  selector: 'app-nutritional-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './nutritional-dialog.html',
  styleUrl: './nutritional-dialog.scss'
})
export class NutritionalDialog {
  private readonly dialogRef = inject(MatDialogRef<NutritionalDialog>);
  public readonly data = inject<{ snacks: MealViewModel[], lunches: MealViewModel[]}>(MAT_DIALOG_DATA)

  constructor() {}

  onNoClick(): void {
    this.dialogRef.close(null);
  }
}
