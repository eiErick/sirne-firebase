import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Menu, MenuRequest, MenuResponse } from '../../models/menu.model';

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
    private firestore: Firestore
  ) {
    this.itemsCollection = collection(this.firestore, 'menus');
  }

  public addItem(item: MenuRequest) {
    return addDoc(this.itemsCollection, item);
  }

  public getItems(): Observable<MenuResponse[]> {
    return collectionData(this.itemsCollection, { idField: 'id' }) as Observable<Menu[]>
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
