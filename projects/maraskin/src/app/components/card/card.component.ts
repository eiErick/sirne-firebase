import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DayTranslatePipe, MealViewModel, Menu } from 'cerebellum';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { NutritionalDialog } from 'sibella';

@Component({
  selector: 'app-card',
  imports: [
    DayTranslatePipe,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  private readonly dialogref = inject(MatDialog);

  public snacks = input.required<MealViewModel[]>();
  public lunches = input.required<MealViewModel[]>();
  public menu = input.required<Menu>();

  public addSnack = output<MealViewModel>();
  public addLunch = output<MealViewModel>();

  public removedSnack = output<MealViewModel[]>();
  public removedLunch = output<MealViewModel[]>();

  public changeSnack = output<MealViewModel>();
  public changeLunch = output<MealViewModel>();

  public changedMenu = output<Menu>();

  constructor() {}

  public changeMenu(index: number, event: any, type: 'snack' | 'lunch') {
    const mealId = event;

    const menu = this.menu();

    if (type === 'snack') {
      const snack = this.snacks().find((s) => s.id === mealId);
      if (snack) menu.snacks[index] = snack;
    }

    if (type === 'lunch') {
      const lunch = this.lunches().find((s) => s.id === mealId);
      if (lunch) menu.lunches[index] = lunch;
    }

    this.changedMenu.emit(menu);
  }

  public removeMealToMenu(index: number, type: 'snack' | 'lunch') {
    if (type === 'snack') {
      const snacks = this.menu().snacks.filter((_, i) => i !== index);
      this.removedSnack.emit(snacks);
    }

    if (type === 'lunch') {
      const lunches = this.menu().lunches.filter((_, i) => i !== index);
      this.removedLunch.emit(lunches);
    }
  }

  public addMealToMenu(type: 'snack' | 'lunch') {
    const meal = this.snacks().find((snack) => snack.name === '---');
    if (meal) type === 'snack' ? this.addSnack.emit(meal) : this.addLunch.emit(meal);
  }

  public async openNutritionalInfoDialog() {
    this.dialogref.open(NutritionalDialog, { data: { snacks: this.menu().snacks, lunches: this.menu().lunches } });
  }
}
