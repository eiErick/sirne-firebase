import { Component, effect, inject, input } from '@angular/core';
import { MealRequest, MealResponse, MealService, MealViewModel } from 'cerebellum';
import { MealFormMenu } from '../../components/meal-form-menu/meal-form-menu';
import { DeleteConfirmDialog } from '../../components/delete-confirm-dialog/delete-confirm-dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from "sibella";
import { Router } from '@angular/router';

@Component({
  selector: 'app-lunch',
  imports: [
    FormsModule,
    MatButtonModule,
    HeaderComponent
],
  templateUrl: './lunch.component.html',
  styleUrl: './lunch.component.scss'
})
export class LunchComponent {
  private readonly bottomSheet = inject(MatBottomSheet);
  private readonly deleteConfirmDialog = inject(MatDialog);

  public allLunches = input<MealViewModel[]>([]);

  public lunches: MealViewModel[] = [];
  public searchTerm: string = '';

  constructor(
    private mealService: MealService,
    private router: Router
  ) {
    effect(() => this.search())
  }

  ngOnInit() { }

  public search() {
    this.lunches = [...this.allLunches().filter((s) => s.name.toUpperCase().includes(this.searchTerm.toUpperCase()))];
  }

  public async openEditLunch(lunch: MealViewModel) {
    const bottomSheetRef = this.bottomSheet.open(MealFormMenu, { data: lunch });

    bottomSheetRef.afterDismissed().subscribe((res) => {
      if (res == null) return;
    });
  }

  public async openCreateLunch() {
    const bottomSheetRef = this.bottomSheet.open(MealFormMenu);

    bottomSheetRef.afterDismissed().subscribe((res) => {
      if (res == null) return;
      this.addLunch(res);
    });
  }

  private addLunch(lunch: MealViewModel) {
    if (!lunch.validar()) return;

    const mealRequest: MealRequest = {
      calories: lunch.calories,
      glucose: lunch.glucose,
      gluten: lunch.glucose,
      lactose: lunch.lactose,
      name: lunch.name,
      type: 'lunch'
    }

    this.mealService.addMeal(mealRequest);
  }

  async presentDeleteConfirm(lunch: MealResponse) {
    const dialogRef = this.deleteConfirmDialog.open(DeleteConfirmDialog, { data: `Você deseja deletar "${lunch.name}"?` });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) this.deleteLunch(lunch);
    });
  }
  
  public openSettings() {
    this.router.navigate(['settings']);
  }

  private deleteLunch(lunch: MealResponse) {
    this.mealService.deleteMeal(lunch.id);
  }
}
