import { Component, computed, OnInit } from '@angular/core';
import { SnackComponent } from '../snack/snack.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MenuComponent } from "../menu/menu.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { FormsModule } from "@angular/forms";
import { Mapper, MealService, MealViewModel, Menu, MenuService, SimpleDayCell, MenuWeek } from 'cerebellum';
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
  public allWeeks: MenuWeek[] = [];

  constructor(
    private mealService: MealService,
    private menuService: MenuService,
    private navigateService: NavigateService,
  ) { }

  ngOnInit() {
    this.getMeals();
    // this.getMenu();
    this.getFake();
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
      const menuViewModel: Menu[] = [];

      res.forEach((m) => {
        const lunches = m.lunches.map((l) => Mapper.mapMatchingProperties(l, new MealViewModel()));
        const snacks = m.snacks.map((s) => Mapper.mapMatchingProperties(s, new MealViewModel()));

        const menu: Menu = {
          day: m.day,
          id: m.id,
          lunches: lunches,
          snacks: snacks,
          today: false,
        }

        menuViewModel.push(menu);
      });

      this.menus = this.organizeDays(menuViewModel);      
    });
  }

  private getFake() {
    const days: SimpleDayCell[] = [
      { day: 'sun', lunches: [{id: "0PLHotbg544AytObwUEd"}], snacks: [{id: "0PLHotbg544AytObwUEd"}, {id: "0PLHotbg544AytObwUEd"}] },
      { day: 'mon', lunches: [{id: "0PLHotbg544AytObwUEd"}], snacks: [{id: "0PLHotbg544AytObwUEd"}, {id: "0PLHotbg544AytObwUEd"}] },
      { day: 'tue', lunches: [{id: "0PLHotbg544AytObwUEd"}], snacks: [{id: "0PLHotbg544AytObwUEd"}, {id: "0PLHotbg544AytObwUEd"}] },
      { day: 'wed', lunches: [{id: "0PLHotbg544AytObwUEd"}], snacks: [{id: "0PLHotbg544AytObwUEd"}, {id: "0PLHotbg544AytObwUEd"}] },
      { day: 'thu', lunches: [{id: "0PLHotbg544AytObwUEd"}], snacks: [{id: "0PLHotbg544AytObwUEd"}, {id: "0PLHotbg544AytObwUEd"}] },
      { day: 'fri', lunches: [{id: "0PLHotbg544AytObwUEd"}], snacks: [{id: "0PLHotbg544AytObwUEd"}, {id: "0PLHotbg544AytObwUEd"}] },
      { day: 'sat', lunches: [{id: "0PLHotbg544AytObwUEd"}], snacks: [{id: "0PLHotbg544AytObwUEd"}, {id: "0PLHotbg544AytObwUEd"}] },
    ];
    
    const week: MenuWeek[] = [
      { days: days, id: '2026-0-0'},
      { days: days, id: '2026-0-1'},
      { days: days, id: '2026-0-2'},
      { days: days, id: '2026-0-3'},
      { days: days, id: '2026-0-4'},
      { days: days, id: '2026-0-5'},
      { days: days, id: '2026-1-0'},
      { days: days, id: '2026-2-0'},
    ];

    this.allWeeks = week;
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
