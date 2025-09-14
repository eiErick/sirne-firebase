import { Component, effect, input, signal } from '@angular/core';
import { Mapper, MealRequest, MealRequestMenu, MealResponse, MealViewModel, Menu, MenuRequest, MenuService } from 'cerebellum';
import { CardComponent } from '../../components/card/card.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SnackComponent } from "../snack/snack.component";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HeaderComponent } from 'sibella';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [
    CardComponent,
    MatTabsModule,
    SnackComponent,
    MatButtonToggleModule,
    HeaderComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  // public userName = computed(() => this.settingService.auth().name);
  // public menus = computed(() => this.menuService.menu());
  public AllMenus = input<Menu[]>([]);
  public menus: Menu[] = [];
  // public snacks = computed(() => this.menuService.snacks());
  public snacks = input<MealViewModel[]>([]);
  // public lunches = computed(() => this.menuService.lunches());
  public lunches = input<MealViewModel[]>([]);
  // public loadMenu = computed(() => this.menuService.loadMenu());

  public select: 'menu' | 'database' = 'menu';
  public databaseType: 'snack' | 'lunch' = 'snack';

  constructor(
    private MenuService: MenuService,
    private router: Router
    // private menuService: MenuService,
    // private settingService: SettingsService,
    // private loadingController: LoadingController,
    // private modalCtrl: ModalController,
  ) {
    effect(() => {
      this.menus = structuredClone(this.AllMenus());
      // if (this.loadMenu()) {
      //   this.loadingScreen();
      // }
    });
  }

  // public changeMenu(menu: Menu) {
  //   this.menuService.changeMenu(menu);
  // }

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

    // this.menu.update((menu) => {
    //   return menu.map((m) => {
    //     if (m.day !== day) return m;

    //     const updated = { ...m }

    //     type === 'snack' ? updated.snacks.splice(index, 1) : updated.lunches.splice(index, 1);

    //     return updated;
    //   });
    // });

    // const menu = this.menu().find((m) => m.day === day);
    // if (menu) this.changeMenu(menu, true);
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
    // this.MenuService.addItem(menuRequest)
  }

  private async loadingScreen() {
    //   const loading = await this.loadingController.create({
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
  }
}
