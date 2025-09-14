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

  public getMeals(): Observable<MealResponse[]> {
    return collectionData(this.itemsCollection, { idField: 'id' }) as Observable<MealResponse[]>
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

  public deleteMeal(id: number) {
    console.log(id);
    
    const itemDoc = doc(this.firestore, `meals/${id}`);
    return deleteDoc(itemDoc);
  }
}
