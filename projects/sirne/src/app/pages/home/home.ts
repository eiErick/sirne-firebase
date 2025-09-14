import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Mapper, MealViewModel, Menu, MenuService } from 'cerebellum';
import { HeaderComponent } from 'sibella';
import { Card } from '../../components/card/card';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    Card
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  public snacks: MealViewModel[] = [];
  public lunches: MealViewModel[] = [];
  public menus: Menu[] = [];

  constructor(
    private router: Router,
    private menuService: MenuService,
  ) { }

  ngOnInit() {
    this.getMenu();
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
  }

  private organizeDays(menu: Menu[]): Menu[] {
    const daysOrder = ["mon", "tue", "wed", "thu", "fri"];

    return menu.sort((a, b) => {
      const dayAIndex = daysOrder.indexOf(a.day.toLowerCase());
      const dayBIndex = daysOrder.indexOf(b.day.toLowerCase());
      return dayAIndex - dayBIndex;
    });
  }

  public openSettings() {
    this.router.navigate(['settings']);
  }
}
