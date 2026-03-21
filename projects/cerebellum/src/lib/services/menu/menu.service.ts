import { Injectable, signal } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { MealViewModel, Menu, MenuWeekResponse, MenuWeekRequest, MenuWeekViewModel, SimpleDayCell } from '../../models/menu.model';
import { MealService } from '../meal/meal.service';
import { Mapper } from '../../utils/Model.util';
import { IdDateWeek } from '../../models/calendar.type';

export interface Item {
  id?: string;
  name: string;
  calories: number;
  lactose: boolean;
  gluten: boolean;
  glucose: boolean;
  likes: number;
  type: 'snack' | 'lunch';
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private itemsCollection;
  private weekCollection;
  public allWeeksMenus = signal<MenuWeekViewModel[]>([]);

  constructor(
    private firestore: Firestore,
    private mealService: MealService,
  ) {
    this.itemsCollection = collection(this.firestore, 'menus');
    this.weekCollection = collection(this.firestore, 'week');
  }

  public addWeekMenu(item: MenuWeekRequest) {
    return from(addDoc(this.itemsCollection, item));
  }

  public defineWeek(week: MenuWeekViewModel) {
    return from(addDoc(this.weekCollection, week));
  }

  public getItems(): Observable<MenuWeekResponse[]> {
    return collectionData(this.itemsCollection, { idField: 'id' }) as Observable<MenuWeekResponse[]>
  }

  //   const querySnapshot = await db
  //   .collection("users")
  //   .where("email", "==", "erick@email.com")
  //   .get();

  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, doc.data());
  // });

  public convertSimpleToMenu(simpleDayMenu: SimpleDayCell, idDateWeek: IdDateWeek, id: string): Menu {
    const { snacks, lunches } = this.mealService.getStorage();

    const menu: Menu = { day: simpleDayMenu.day, idDate: idDateWeek, lunches: [], snacks: [], today: false, id: id }

    for (const snack of simpleDayMenu.snacks) {
      // const found = snacks.find((s) => s.id === snack.id);
      const found = snacks[snack.id];

      if (!!found) {
        const snackView = Mapper.mapMatchingProperties(snack, new MealViewModel());
        menu.snacks.push(snackView);
      }
    }

    for (const lunch of simpleDayMenu.lunches) {
      // const found = lunches.find((s) => s.id === lunch.id);
      const found = lunches[lunch.id];

      if (!!found) {
        const snackView = Mapper.mapMatchingProperties(lunch, new MealViewModel());
        menu.lunches.push(snackView);
      }
    }

    return menu;
  }

  public getMealId(id: number) {
    const itemDoc = doc(this.firestore, `menus/${id}`);
    return docData(itemDoc, { idField: 'id' }) as Observable<Item>;
  }

  public getItem(id: string): Observable<Item> {
    const itemDoc = doc(this.firestore, `menus/${id}`);
    return docData(itemDoc, { idField: 'id' }) as Observable<Item>;
  }

  public updateItem(id: string, data: Partial<MenuWeekRequest>) {
    console.log(data);

    const itemDoc = doc(this.firestore, `menus/${id}`);
    return updateDoc(itemDoc, data);
  }

  public deleteItem(id: string) {
    const itemDoc = doc(this.firestore, `menus/${id}`);
    return deleteDoc(itemDoc);
  }
}
