import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MealResponse, MealViewModel, Menu, MenuRequest, MenuResponse, SimpleDayCell } from '../../models/menu.model';
import { MealService } from '../meal/meal.service';
import { Mapper } from '../../utils/Model.util';

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

  constructor(
    private firestore: Firestore,
    private mealService: MealService,
  ) {
    this.itemsCollection = collection(this.firestore, 'menus');
  }

  public addItem(item: MenuRequest) {
    return addDoc(this.itemsCollection, item);
  }

  public getItems(): Observable<MenuResponse[]> {
    return collectionData(this.itemsCollection, { idField: 'id' }) as Observable<Menu[]>
  }

  public convertSimpleToMenu(simpleDayMenu: SimpleDayCell): Menu {
    const { snacks, lunches } = this.mealService.getStorage();

    console.log(snacks);
    

    const menu: Menu = { day: simpleDayMenu.day, id: '', lunches: [], snacks: [], today: false }

    for (const snack of simpleDayMenu.snacks) {
      const found = snacks.find((s) => s.id === snack.id);

      if (!!found) {
        const snackView = Mapper.mapMatchingProperties(snack, new MealViewModel());
        menu.snacks.push(snackView);
      }
    }

    for (const lunch of simpleDayMenu.lunches) {
      const found = lunches.find((s) => s.id === lunch.id);

      if (!!found) {
        const snackView = Mapper.mapMatchingProperties(lunch, new MealViewModel());
        menu.lunches.push(snackView);
      }
    }

    return menu;
  }

  public addWeek() {

  }

  public getMealId(id: number) {
    const itemDoc = doc(this.firestore, `menus/${id}`);
    return docData(itemDoc, { idField: 'id' }) as Observable<Item>;
  }

  public getItem(id: string): Observable<Item> {
    const itemDoc = doc(this.firestore, `menus/${id}`);
    return docData(itemDoc, { idField: 'id' }) as Observable<Item>;
  }

  public updateItem(id: string, data: Partial<MenuRequest>) {
    const itemDoc = doc(this.firestore, `menus/${id}`);
    return updateDoc(itemDoc, data);
  }

  public deleteItem(id: string) {
    const itemDoc = doc(this.firestore, `menus/${id}`);
    return deleteDoc(itemDoc);
  }
}
