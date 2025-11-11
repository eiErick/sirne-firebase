import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class PlataformService {
  public isPwa: boolean = false;
  public isNative: boolean = false;

  constructor() {
    this.isPwa = this.isInStandaloneMode();
    this.isNative = this.isNativeMode();
  }

  private isInStandaloneMode(): boolean {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = ('standalone' in window.navigator) && (window.navigator as any).standalone;
    return isStandalone || isIOSStandalone;
  }

  private isNativeMode(): boolean {
    return Capacitor.isNativePlatform();
  }
}
