import { Component, inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatNavList } from '@angular/material/list';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MealViewModel } from 'cerebellum';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-meal-form-menu',
  imports: [
    MatBottomSheetModule,
    MatNavList,
    MatFormField,
    MatLabel,
    FormsModule,
    MatInputModule,
    MatSlideToggleModule
  ],
  templateUrl: './meal-form-menu.html',
  styleUrl: './meal-form-menu.scss'
})
export class MealFormMenu {
  private readonly data = inject(MAT_BOTTOM_SHEET_DATA);
  private readonly sheetRef = inject<MatBottomSheetRef<MealFormMenu>>(MatBottomSheetRef);

  public mealSel: MealViewModel = new MealViewModel();

  constructor() {
    if (this.data != null) this.mealSel = this.data;
  }

  public close() {
    this.sheetRef.dismiss(null);
  }

  public confirm() {
    this.sheetRef.dismiss(this.mealSel);
  }
}
