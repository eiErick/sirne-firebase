import { Component, computed, OnInit } from '@angular/core';
import { SnackComponent } from '../snack/snack.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MenuComponent } from "../menu/menu.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { FormsModule } from "@angular/forms";
import { Mapper, MealService, MealViewModel, Menu, MenuService, MenuWeekViewModel, MenuDayViewModel } from 'cerebellum';
import { LunchComponent } from '../lunch/lunch.component';
import { CommonModule } from '@angular/common';
import { Navigate } from "../../components/navigate/navigate";
import { NavigateService } from '../../services/navigate.service';

@Component({
  selector: 'app-home',
  imports: [
    MatTabsModule,
    SnackComponent,
    LunchComponent,
    MenuComponent,
    MatButtonToggleModule,
    FormsModule,
    CommonModule,
    Navigate
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  public navigate = computed(() => this.navigateService.navigate());
  public snacks: MealViewModel[] = [];
  public lunches: MealViewModel[] = [];
  public menus: Menu[] = [];
  public allWeeks: MenuWeekViewModel[] = [];

  constructor(
    private mealService: MealService,
    private menuService: MenuService,
    private navigateService: NavigateService,
  ) { }

  ngOnInit() {
    this.getMeals();
    this.getMenu();
  }

  private getMeals() {
    this.mealService.getMeals().subscribe((res) => {
      const snacks = res.filter((s) => s.type === 'snack');
      const lunches = res.filter((s) => s.type === 'lunch');

      this.snacks = snacks.map((s) => Mapper.mapMatchingProperties(s, new MealViewModel()));
      this.lunches = lunches.map((s) => Mapper.mapMatchingProperties(s, new MealViewModel()));

      this.mealService.setStorage(snacks, lunches);
    });
  }

  public getMenu() {
    this.menuService.getItems().subscribe((res) => {      
      const menuWeeksViewModel: MenuWeekViewModel[] = [];

      res.forEach((r) => {
        const menuWeekViewModel: MenuWeekViewModel = { idDate: r.idDate, id: r.id, days: [] };

        r.days.forEach(async (d) => {
          let snacks = await Promise.all(
            d.snacks.map(async (s) => {
              let snack = this.mealService.getSnackById(s.id);

              if (!snack) {
                // snack = await this.mealService.fetchSnackById(s.id); // fallback
              }

              return snack;
            })
          );

          let lunches = await Promise.all(
            d.lunches.map(async (l) => {
              let lunch = this.mealService.getLunchById(l.id);

              if (!lunch) {
                // lunch = await this.mealService.fetchLunchById(l.id); // fallback
              }

              return lunch;
            })
          );

          snacks = snacks === undefined ? [] : snacks;
          lunches = lunches === undefined ? [] : lunches;

          const menuDay: MenuDayViewModel = { day: d.day, lunches: lunches as MealViewModel[], snacks: snacks as MealViewModel[] }

          menuWeekViewModel.days.push(menuDay);
        });

        menuWeeksViewModel.push(menuWeekViewModel);
      });

      this.menuService.allWeeksMenus.set(menuWeeksViewModel);
      this.allWeeks = menuWeeksViewModel;    
    });
  }

  // private organizeDays(menu: Menu[]): Menu[] {
  //   const daysOrder = ["mon", "tue", "wed", "thu", "fri"];

  //   return menu.sort((a, b) => {
  //     const dayAIndex = daysOrder.indexOf(a.day.toLowerCase());
  //     const dayBIndex = daysOrder.indexOf(b.day.toLowerCase());
  //     return dayAIndex - dayBIndex;
  //   });
  // }
}
