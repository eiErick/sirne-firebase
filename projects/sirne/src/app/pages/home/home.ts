import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Mapper, MealViewModel, Menu, MenuService, SnackbarService } from 'cerebellum';
import { HeaderComponent } from 'sibella';
import { Card } from '../../components/card/card';
import { dayOption, WeekdaySelector } from '../../components/weekday-selector/weekday-selector';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    Card,
    WeekdaySelector,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  public snacks: MealViewModel[] = [];
  public lunches: MealViewModel[] = [];
  public menus: Menu[] = [];
  public filtredMenus: Menu[] = [];
  public options: dayOption[];
  public loading: boolean = true;

  constructor(
    private router: Router,
    private menuService: MenuService,
    private snackbar: SnackbarService
  ) {
    this.options = [
      { name: 'Seg', id: 'mon', check: false },
      { name: 'Ter', id: 'tue', check: false },
      { name: 'Qua', id: 'wed', check: false },
      { name: 'Qui', id: 'thu', check: false },
      { name: 'Sex', id: 'fri', check: false },
    ]
  }

  ngOnInit() {
    this.getMenuStorage();
    this.getMenu();
  }

  public loadFiltredMenu() {
    const checkedIds = this.options.filter(o => o.check).map(o => o.id);

    this.filtredMenus = [...this.menus];

    checkedIds.length === 0 ? this.filtredMenus = [...this.menus] : this.filtredMenus = this.menus.filter(m => checkedIds.some(id => m.day === id));
  }

  private getMenuStorage() {
    const saved = localStorage.getItem('menu');

    if (saved !== null) {
      const menus: Menu[] = JSON.parse(saved);

      if (menus.length < 1) {
        this.loading = true;
        return;
      }

      this.loading = false;

      this.menus = this.organizeDays(menus);
      this.loadFiltredMenu();
    }
  }

  public getMenu() {
    this.menuService.getItems().subscribe({
      next: (res) => {
        if (res.length < 1) return;

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

        this.loading = false;

        this.menus = this.organizeDays(menuViewModel);
        this.setMenuStorage(this.menus);
        this.loadFiltredMenu();
      }, error: (err) => {
        this.snackbar.showError('Erro ao carregar menu!');
        console.error('Erro ao carregar o menu: ', err);
      },
    });
  }

  private setMenuStorage(menu: Menu[]) {
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  private organizeDays(menu: Menu[]): Menu[] {
    const daysOrder = ["mon", "tue", "wed", "thu", "fri"];

    return menu.sort((a, b) => {
      const dayAIndex = daysOrder.indexOf(a.day.toLowerCase());
      const dayBIndex = daysOrder.indexOf(b.day.toLowerCase());
      return dayAIndex - dayBIndex;
    });
  }

  public updateOptions(options: dayOption[]) {
    this.options = options;
    this.loadFiltredMenu();
  }

  public openSettings() {
    this.router.navigate(['settings']);
  }
}
