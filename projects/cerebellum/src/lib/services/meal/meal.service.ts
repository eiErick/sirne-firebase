import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MealRequest, MealResponse } from '../../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private itemsCollection;
  private storageCache: StorageMeal | null = null;
  
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

  public getStorage(): StorageMeal {
    if (!this.storageCache) {
      this.loadFromLocalStorage();
    }
    return this.storageCache!;
  }

  private loadFromLocalStorage(): void {
    const snacksArray: MealResponse[] = JSON.parse(localStorage.getItem('snacks') ?? '[]');
    const lunchesArray: MealResponse[] = JSON.parse(localStorage.getItem('lunches') ?? '[]');

    const snacks = this.toDictionary(snacksArray);
    const lunches = this.toDictionary(lunchesArray);

    this.storageCache = { snacks, lunches };
  }

  private toDictionary(arr: MealResponse[]): Record<string, MealResponse> {
    return arr.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {} as Record<string, MealResponse>);
  }

  public getSnackById(id: string): MealResponse | undefined {
    return this.getStorage().snacks[id];
  }

  public getLunchById(id: string): MealResponse | undefined {
    return this.getStorage().lunches[id];
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

type StorageMeal = {
  snacks: Record<string, MealResponse>;
  lunches: Record<string, MealResponse>;
};