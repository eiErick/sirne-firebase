import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MealRequest, MealResponse } from '../../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private itemsCollection;

  constructor(
    private firestore: Firestore
  ) {
    this.itemsCollection = collection(this.firestore, 'meals');
  }

  public addMeal(item: MealRequest) {
    return addDoc(this.itemsCollection, item);
  }

  public setStorage(snacks: MealResponse[], lunches: MealResponse[]) {
    localStorage.setItem('snacks', JSON.stringify(snacks));
    localStorage.setItem('lunches', JSON.stringify(lunches));
  }

  public getMeals(): Observable<MealResponse[]> {
    return collectionData(this.itemsCollection, { idField: 'id' }) as Observable<MealResponse[]>
  }

  public getStorage(): { snacks: MealResponse[], lunches: MealResponse[] } {
    const snacks = JSON.parse(localStorage.getItem('snacks') ?? '[]');
    const lunches = JSON.parse(localStorage.getItem('lunches') ?? '[]');

    return { snacks, lunches };
  }

  public getMealId(id: number) {
    const itemDoc = doc(this.firestore, `meals/${id}`);
    return docData(itemDoc, { idField: 'id' }) as Observable<MealResponse>;
  }

  public getMeal(id: string): Observable<MealResponse> {
    const itemDoc = doc(this.firestore, `meals/${id}`);
    return docData(itemDoc, { idField: 'id' }) as Observable<MealResponse>;
  }

  public updateMeal(id: string, data: Partial<MealRequest>) {
    const itemDoc = doc(this.firestore, `meals/${id}`);
    return updateDoc(itemDoc, data);
  }

  public deleteMeal(id: string) {
    console.log(id);

    const itemDoc = doc(this.firestore, `meals/${id}`);
    return deleteDoc(itemDoc);
  }
}
