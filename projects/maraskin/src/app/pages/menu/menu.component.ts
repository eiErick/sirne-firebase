import { Component, effect, input } from '@angular/core';
import { DayCell, MealViewModel, Menu, MenuService, MonthCalendar, Day, SimpleMeal, SimpleMenuRequest, MenuWeekRequest, SimpleDayCell, SnackbarService, IdDateWeek, MenuWeekViewModel, CalendarOptions, selectableWeekViewModel, CardapioPdfService } from 'cerebellum';
import { CardComponent } from '../../components/card/card.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from 'sibella';
import { CalendarService } from 'cerebellum';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatAnchor } from "@angular/material/button";
import { MatSelectModule } from '@angular/material/select';
import { CdkAriaLive } from '@angular/cdk/a11y';

@Component({
  selector: 'app-menu',
  imports: [
    CardComponent,
    MatTabsModule,
    MatButtonToggleModule,
    HeaderComponent,
    MatSidenavModule,
    CommonModule,
    MatAnchor,
    MatSelectModule,
    CdkAriaLive
],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  public AllMenus = input<Menu[]>([]);
  public allWeeks = input<MenuWeekViewModel[]>([]);
  public menus: Menu[] = [];
  public menusWeeks: MenuWeekViewModel[] = [];
  public snacks = input<MealViewModel[]>([]);
  public lunches = input<MealViewModel[]>([]);
  public calendar: MonthCalendar[] = [];
  public monthSelected: MonthCalendar | null = null;
  public weeksSelected: DayCell[][] = [];
  public weekSelected: DayCell[] = [];
  public idDateWeekSeleted: IdDateWeek = "00-00-0000";
  public numSelectedWeek: number = 0;
  public showSidenav = true;
  public initialWeekDate: Date = new Date();
  public endWeekDate: Date = new Date();
  public selectableWeeks: selectableWeekViewModel[] = [];
  public oldWeekId: string = '';
  public activeWeek: string = '';
  public loadingWeekActive: boolean = false;

  public select: 'menu' | 'database' = 'menu';
  public databaseType: 'snack' | 'lunch' = 'snack';

  constructor(
    private menuService: MenuService,
    private calendarService: CalendarService,
    private snackbar: SnackbarService,
    private router: Router,
    private pdfService: CardapioPdfService
  ) {
    effect(() => {
      this.menusWeeks = structuredClone(this.allWeeks());
      this.loadSelectableWeeks();
    });

    this.loadCalendar();
    this.loadSelectedWeek();
  }

  private loadCalendar() {
    const calendarOptions: CalendarOptions = {
      hiddenWeekdays: [0, 6],
      startOfWeek: 1
    }

    this.calendar = this.calendarService.generateYearCalendar(2026, calendarOptions);
    const month = new Date().getMonth();

    this.calendar[month].selected = true;
    this.selectMonth(this.calendar[month]);
  }

  private loadSelectedWeek() {
    this.loadingWeekActive = true;

    this.menuService.getWeek().subscribe((res) => {
      this.loadingWeekActive = false;

      if (res.length == 0) {
        return;
      }

      const week = res[0];
      this.activeWeek = week.idDate;
      this.oldWeekId = week.id;
    })
  }

  private loadSelectableWeeks() {
    for (const week of this.allWeeks()) {
      const selectable: selectableWeekViewModel = {
        id: week.idDate,
        date: this.calendarService.idDateWeekToDate(week.idDate),
      }

      this.selectableWeeks.push(selectable);
    }
  }

  public selectMonth(month: MonthCalendar) {
    this.backMonth();

    this.monthSelected = month;

    for (const m of this.calendar) {
      m.selected = m.month === month.month ? true : false;

      if (m.selected) {
        this.weeksSelected = m.weeks;
      }
    }
  }

  public selectWeek(week: DayCell[], numWeek: number) {
    this.weekSelected = week;
    this.numSelectedWeek = numWeek + 1;

    this.initialWeekDate = week[0].date;
    this.endWeekDate = week[week.length - 1].date;

    const year = week[0].year;
    const month = week[0].month;

    const idDateWeek = this.calendarService.makeIdDateWeek(year, month, numWeek);
    this.idDateWeekSeleted = idDateWeek;

    const simpleMenu = this.allWeeks().find((w) => w.idDate === idDateWeek);

    if (!simpleMenu) {
      this.menus = [];
      return;
    }

    const menu: Menu[] = [];

    if (!!simpleMenu) {
      for (const day of simpleMenu.days) {
        menu.push(this.menuService.convertSimpleToMenu(day, idDateWeek, simpleMenu.id));
      }
    }

    this.menus = menu;
  }

  public defineWeek(event: any) {
    const idDateWeek = event.value;

    const week = this.allWeeks().find((w) => w.idDate === idDateWeek);

    if (week) {
      week.id = this.oldWeekId;

      this.menuService.defineWeek(week).subscribe({
        next: (res) => {
          this.snackbar.showSuccess("Menu alterado com sucesso!");
          // this.storageWeekSelected(idDateWeek);
        },
        error: (err) => {
          this.snackbar.showError("Erro ao alterar o menu!");
        }
      });
    }
  }

  // private storageWeekSelected(idDateWeek: IdDateWeek) {
  //   localStorage.setItem('week', idDateWeek);
  // }

  public createWeek(idDateWeek: IdDateWeek) {
    const snackEmpty = this.snacks().find((s) => s.name === "---");
    const lunchEmpty = this.lunches().find((l) => l.name === "---");

    if (!snackEmpty || !lunchEmpty) {
      this.snackbar.showError('Erro ao carregar itens vazios!');
    }

    const days: SimpleDayCell[] = [
      // { day: 'sun', lunches: [{ id: lunchEmpty!.id }], snacks: [{ id: snackEmpty!.id }] },
      { day: 'mon', lunches: [{ id: lunchEmpty!.id }], snacks: [{ id: snackEmpty!.id }] },
      { day: 'tue', lunches: [{ id: lunchEmpty!.id }], snacks: [{ id: snackEmpty!.id }] },
      { day: 'wed', lunches: [{ id: lunchEmpty!.id }], snacks: [{ id: snackEmpty!.id }] },
      { day: 'thu', lunches: [{ id: lunchEmpty!.id }], snacks: [{ id: snackEmpty!.id }] },
      { day: 'fri', lunches: [{ id: lunchEmpty!.id }], snacks: [{ id: snackEmpty!.id }] },
      // { day: 'sat', lunches: [{ id: lunchEmpty!.id }], snacks: [{ id: snackEmpty!.id }] },
    ];

    const weekRequest: MenuWeekRequest = { days: days, idDate: idDateWeek };
    console.log("create week");

    this.menuService.addWeekMenu(weekRequest).subscribe((res) => {
      this.snackbar.showSuccess("Semana adicionanda com sucesso!");
      this.backMonth();
    });
  }

  public backMonth() {
    this.clearWeek();
  }

  private clearWeek() {
    this.weekSelected = [];
  }

  public addMealToMenu(meal: MealViewModel, day: Day, type: 'snack' | 'lunch') {
    const menusUpdated = this.menus.map((m) => {
      if (m.day !== day) return m;

      const updated = { ...m }

      type === 'snack' ? updated.snacks = [...m.snacks, meal] : updated.lunches = [...m.lunches, meal];

      return updated;
    });

    const menu = menusUpdated.find((m) => m.day === day);
    if (menu) this.changeMenu(menu);
  }

  public removeMealToMenu(meals: MealViewModel[], day: Day, type: 'snack' | 'lunch') {
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
    const snacksRequest: SimpleMeal[] = [];
    const lunchesRequest: SimpleMeal[] = [];

    menu.snacks.forEach((s) => {
      const snackRequest: SimpleMeal = { id: s.id };
      snacksRequest.push(snackRequest);
    });

    menu.lunches.forEach((l) => {
      const lunchRequest: SimpleMeal = { id: l.id };
      lunchesRequest.push(lunchRequest);
    });

    // const snacksRequest: MealRequestMenu[] = [];
    // const lunchesRequest: MealRequestMenu[] = [];

    // menu.snacks.forEach((s) => {
    //   const snackRequest: MealRequestMenu = {
    //     calories: s.calories,
    //     glucose: s.glucose,
    //     gluten: s.gluten,
    //     lactose: s.lactose,
    //     name: s.name,
    //     type: s.type,
    //     id: s.id,
    //     likes: s.likes
    //   }

    //   snacksRequest.push(snackRequest);
    // });

    // menu.lunches.forEach((s) => {
    //   const lunchRequest: MealRequestMenu = {
    //     calories: s.calories,
    //     glucose: s.glucose,
    //     gluten: s.gluten,
    //     lactose: s.lactose,
    //     name: s.name,
    //     type: s.type,
    //     id: s.id,
    //     likes: s.likes
    //   }

    //   lunchesRequest.push(lunchRequest);
    // });

    // const menuRequest: MenuRequest = {
    //   day: menu.day,
    //   lunches: lunchesRequest,
    //   snacks: snacksRequest,
    // };    

    const weekSelected = this.allWeeks().find((w) => w.idDate === menu.idDate);


    const daysOfweekRequest: SimpleDayCell[] = [];

    if (!weekSelected) {
      return;
    }

    const simpleMenuRequest: SimpleMenuRequest = {
      day: menu.day,
      lunches: lunchesRequest,
      snacks: snacksRequest,
    }

    for (const day of weekSelected.days) {
      if (day.day === menu.day) {
        const dayRequest: SimpleDayCell = {
          day: day.day,
          snacks: simpleMenuRequest.snacks,
          lunches: simpleMenuRequest.lunches
        }

        daysOfweekRequest.push(dayRequest);

        continue;
      }

      console.log(day);


      const snacksDayRequest: SimpleMeal[] = [];
      const lunchesDayRequest: SimpleMeal[] = [];

      day.snacks.forEach((s) => {
        const snackRequest: SimpleMeal = { id: s.id };
        snacksDayRequest.push(snackRequest);
      });

      day.lunches.forEach((l) => {
        const lunchRequest: SimpleMeal = { id: l.id };
        lunchesDayRequest.push(lunchRequest);
      });

      const dayRequest: SimpleDayCell = {
        day: day.day,
        snacks: snacksDayRequest,
        lunches: lunchesDayRequest,
      }

      daysOfweekRequest.push(dayRequest);
    }

    console.log(daysOfweekRequest);


    const simpleWeekRequest: MenuWeekRequest = {
      days: daysOfweekRequest,
      idDate: weekSelected.idDate
    }

    console.log(simpleWeekRequest);

    console.log(menu.id);

    this.menuService.updateItem(menu.id, simpleWeekRequest);
  }

  public exportarPdf(): void {
    // Seus dados existentes, sem nenhuma transformação
    this.pdfService.generatePdf(this.allWeeks(), 'CARDÁPIO MENSAL (28/7 À 29/8/2025)');
  }
}
