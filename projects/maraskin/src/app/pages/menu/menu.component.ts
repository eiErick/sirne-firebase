import { Component, effect, input } from '@angular/core';
import { MealRequestMenu, MealViewModel, Menu, MenuRequest, MenuService } from 'cerebellum';
import { CardComponent } from '../../components/card/card.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from 'sibella';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [
    CardComponent,
    MatTabsModule,
    MatButtonToggleModule,
    HeaderComponent,
    MatSidenavModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  public AllMenus = input<Menu[]>([]);
  public menus: Menu[] = [];
  public snacks = input<MealViewModel[]>([]);
  public lunches = input<MealViewModel[]>([]);

  public select: 'menu' | 'database' = 'menu';
  public databaseType: 'snack' | 'lunch' = 'snack';

  constructor(
    private MenuService: MenuService,
    private router: Router
  ) {
    effect(() => this.menus = structuredClone(this.AllMenus()));
  }

  public addMealToMenu(meal: MealViewModel, day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri', type: 'snack' | 'lunch') {
    const menusUpdated = this.menus.map((m) => {
      if (m.day !== day) return m;

      const updated = { ...m }

      type === 'snack' ? updated.snacks = [...m.snacks, meal] : updated.lunches = [...m.lunches, meal];

      return updated;
    });

    const menu = menusUpdated.find((m) => m.day === day);
    if (menu) this.changeMenu(menu);
  }

  public removeMealToMenu(meals: MealViewModel[], day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri', type: 'snack' | 'lunch') {
    const menusUpdated = this.menus.map((m) => {
      if (m.day !== day) return m;

      const updated = { ...m }

      type === 'snack' ? updated.snacks = meals : updated.lunches = meals;

      return updated;
    });

    const menu = menusUpdated.find((m) => m.day === day);
    if (menu) this.changeMenu(menu);
  }


  public openSettings() {
    this.router.navigate(['settings']);
  }

  public changeMenu(menu: Menu) {
    console.log(menu);
    
    const snacksRequest: MealRequestMenu[] = [];
    const lunchesRequest: MealRequestMenu[] = [];

    menu.snacks.forEach((s) => {
      const snackRequest: MealRequestMenu = {
        calories: s.calories,
        glucose: s.glucose,
        gluten: s.gluten,
        lactose: s.lactose,
        name: s.name,
        type: s.type,
        id: s.id,
        likes: s.likes
      }

      snacksRequest.push(snackRequest);
    });

    menu.lunches.forEach((s) => {
      const lunchRequest: MealRequestMenu = {
        calories: s.calories,
        glucose: s.glucose,
        gluten: s.gluten,
        lactose: s.lactose,
        name: s.name,
        type: s.type,
        id: s.id,
        likes: s.likes
      }

      lunchesRequest.push(lunchRequest);
    });

    const menuRequest: MenuRequest = {
      day: menu.day,
      lunches: lunchesRequest,
      snacks: snacksRequest,
    };

    this.MenuService.updateItem(menu.id, menuRequest);
  }
}
