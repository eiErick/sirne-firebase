import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  public navigate = signal<'menu' | 'snack' | 'lunch'>('menu');
}
