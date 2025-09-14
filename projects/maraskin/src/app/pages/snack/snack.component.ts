import { Component, computed, effect, inject, input, model, OnInit } from '@angular/core';
import { MealResponse, MenuService, MealService, MealViewModel, MealRequest } from 'cerebellum';
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MealFormMenu } from '../../components/meal-form-menu/meal-form-menu'
import { DeleteConfirmDialog } from '../../components/delete-confirm-dialog/delete-confirm-dialog';
import { MatDialog } from '@angular/material/dialog';
import { HeaderComponent } from "sibella";
import { Router } from '@angular/router';

@Component({
  selector: 'app-snack',
  imports: [
    FormsModule,
    MatButtonModule,
    HeaderComponent
],
  templateUrl: './snack.component.html',
  styleUrl: './snack.component.scss'
})
export class SnackComponent implements OnInit {
  private readonly bottomSheet = inject(MatBottomSheet);
  private readonly deleteConfirmDialog = inject(MatDialog);

  public allSnacks = input<MealViewModel[]>([]);

  public snacks: MealViewModel[] = [];
  public searchTerm: string = '';

  constructor(
    private mealService: MealService,
    private router: Router
  ) {
    effect(() => this.search())
  }

  ngOnInit() { }

  public search() {
    this.snacks = [...this.allSnacks().filter((s) => s.name.toUpperCase().includes(this.searchTerm.toUpperCase()))];
  }

  // public openSettings() {
  //   this.modalCtrl.create({
  //     component: SettingsComponent,
  //   }).then((m) => m.present());
  // }

  // private async loadingScreen() {
  //   const loading = await this.loadingCtrl.create({
  //     message: 'Carregando...',
  //     spinner: 'crescent'
  //   });

  //   await loading.present();

  //   const interval = setInterval(async () => {
  //     if (!this.loadMenu()) {
  //       clearInterval(interval);
  //       await loading.dismiss();
  //     }
  //   }, 100);
  // }

  public async openEditSnack(snack: MealViewModel) {
    const bottomSheetRef = this.bottomSheet.open(MealFormMenu, { data: snack });

    bottomSheetRef.afterDismissed().subscribe((res) => {
      if (res == null) return;
    });
  }

  public async openCreateSnack() {
    const bottomSheetRef = this.bottomSheet.open(MealFormMenu);

    bottomSheetRef.afterDismissed().subscribe((res) => {
      if (res == null) return;
      this.addSnack(res);
    });
  }

  private addSnack(snack: MealViewModel) {
    if (!snack.validar()) return;

    const mealRequest: MealRequest = {
      calories: snack.calories,
      glucose: snack.glucose,
      gluten: snack.glucose,
      lactose: snack.lactose,
      name: snack.name,
      type: 'snack'
    }

    this.mealService.addMeal(mealRequest);
  }

  public async presentDeleteConfirm(snack: MealResponse) {
    const dialogRef = this.deleteConfirmDialog.open(DeleteConfirmDialog, { data: `Você deseja deletar "${snack.name}"?` });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) this.deleteSnack(snack);
    });
  }

  public openSettings() {
    this.router.navigate(['settings']);
  }

  private deleteSnack(snack: MealResponse) {
    this.mealService.deleteMeal(snack.id);
  }
}