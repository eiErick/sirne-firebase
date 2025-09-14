import { Component, computed, OnInit } from '@angular/core';
import { SnackComponent } from '../snack/snack.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MenuComponent } from "../menu/menu.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { FormsModule } from "@angular/forms";
import { Mapper, MealService, MealViewModel, Menu, MenuService } from 'cerebellum';
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

  constructor(
    private mealService: MealService,
    private menuService: MenuService,
    private navigateService: NavigateService
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


      // this.filtredSnacks
      // this.snacks = meals;

      // console.log(meals);


      // this.search();
    });
  }

  public getMenu() {
    this.menuService.getItems().subscribe((res) => {
      const menuViewModel: Menu[] = [];

      res.forEach((m) => {
        const lunches = m.lunches.map((l) => Mapper.mapMatchingProperties(l, new MealViewModel()));
        const snacks = m.snacks.map((s) => Mapper.mapMatchingProperties(s, new MealViewModel()));

        const menu: Menu = {
          day: m.day,
          id: m.id,
          lunches: lunches,
          snacks: snacks,
        }

        menuViewModel.push(menu);
      });

      this.menus = this.organizeDays(menuViewModel);      
    });

    // this.menus = [
    //   { day: 'mon', id: '', snacks: [{ calories: 0, glucose: false, gluten: false, id: 0, lactose: false, likes: 0, name: 'merenda', type: 'snack' }], lunches: [{ calories: 0, glucose: false, gluten: false, id: 0, lactose: false, likes: 0, name: 'almoco', type: 'lunch' }] },
    //   { day: 'thu', id: '', snacks: [{ calories: 0, glucose: false, gluten: false, id: 0, lactose: false, likes: 0, name: 'merenda', type: 'snack' }], lunches: [{ calories: 0, glucose: false, gluten: false, id: 0, lactose: false, likes: 0, name: 'almoco', type: 'lunch' }] },
    //   { day: 'wed', id: '', snacks: [{ calories: 0, glucose: false, gluten: false, id: 0, lactose: false, likes: 0, name: 'merenda', type: 'snack' }], lunches: [{ calories: 0, glucose: false, gluten: false, id: 0, lactose: false, likes: 0, name: 'almoco', type: 'lunch' }] },
    //   { day: 'tue', id: '', snacks: [{ calories: 0, glucose: false, gluten: false, id: 0, lactose: false, likes: 0, name: 'merenda', type: 'snack' }], lunches: [{ calories: 0, glucose: false, gluten: false, id: 0, lactose: false, likes: 0, name: 'almoco', type: 'lunch' }] },
    //   { day: 'fri', id: '', snacks: [{ calories: 0, glucose: false, gluten: false, id: 0, lactose: false, likes: 0, name: 'merenda', type: 'snack' }], lunches: [{ calories: 0, glucose: false, gluten: false, id: 0, lactose: false, likes: 0, name: 'almoco', type: 'lunch' }] },
    // ];
  }

  private organizeDays(menu: Menu[]): Menu[] {
    const daysOrder = ["mon", "tue", "wed", "thu", "fri"];

    return menu.sort((a, b) => {
      const dayAIndex = daysOrder.indexOf(a.day.toLowerCase());
      const dayBIndex = daysOrder.indexOf(b.day.toLowerCase());
      return dayAIndex - dayBIndex;
    });
  }
}
