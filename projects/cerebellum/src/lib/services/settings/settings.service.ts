import { Injectable, signal } from '@angular/core';
import { Auth } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public auth = signal<Auth>({ appid: '', appkey: '', name: '', icon: '' });

  constructor() {
    this.getSetting();
  }

  private getSetting() {
    const authSaved = localStorage.getItem('auth');

    if (authSaved !== null) {
      const auth: Auth = JSON.parse(authSaved);
      this.auth.set(auth);
    } else {
      const auth: Auth = { appid: '', appkey: '', icon: 'https://ionicframework.com/docs/img/demos/avatar.svg', name: 'Estudante' }
      this.auth.set(auth);

      localStorage.setItem('auth', JSON.stringify(auth));
    }

    if (!this.auth().icon || this.auth().icon.length === 0) {
      this.auth.update((auth) => ({ ...auth, icon: 'https://ionicframework.com/docs/img/demos/avatar.svg' }));
    }
  }

  public async setIcon(path: string) {
    const auth = this.auth();
    auth.icon = path;

    this.auth.update((auth) => ({ ...auth, icon: path }));

    localStorage.setItem('auth', JSON.stringify(auth));
  }
}
