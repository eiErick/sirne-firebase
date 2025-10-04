import { Injectable, signal } from '@angular/core';
import { Auth } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public auth = signal<Auth>({ appid: '', appkey: '', name: '', icon: '', randomIcon: false });
  public avatars: string[] = [
    'cat.png',
    'centipede.png',
    'cuetzpalin.png',
    'gorilla.png',
    'leo.png',
    'meerkat.png',
    'panda.png',
    'penguin.png',
    'pink.png',
    'shark.png',
    'squirrel.png',
    'stingray.png',
    'peacock.png',
    'elephant.png',
    'beaver.png',
    'cockatiel.png',
    'cheetah.png',
    'turtle.png',
  ];

  constructor() {
    this.getSetting();
  }

  private getSetting() {
    const authSaved = localStorage.getItem('auth');

    if (authSaved !== null) {
      const auth: Auth = JSON.parse(authSaved);
      this.auth.set(auth);
    } else {
      const auth: Auth = { appid: '', appkey: '', icon: '', name: 'Estudante', randomIcon: false }
      this.auth.set(auth);

      localStorage.setItem('auth', JSON.stringify(auth));
    }

    if (!this.auth().icon || this.auth().icon.length === 0) {
      const icon = this.selectRandomAvatar();
      this.auth.update((auth) => ({ ...auth, icon: icon }));
      this.setIcon(this.selectRandomAvatar());
    }

    if (this.auth().randomIcon) {
      const icon = this.selectRandomAvatar();

      const auth = this.auth();
      auth.icon = icon;

      this.auth.set(auth);
    }
  }

  private selectRandomAvatar(): string {
    const randomIndex = Math.floor(Math.random() * this.avatars.length);
    return this.avatars[randomIndex];
  }

  public async setIcon(path: string) {    
    const auth = this.auth();

    auth.icon = path;

    this.auth.set(auth);

    localStorage.setItem('auth', JSON.stringify(auth));
  }

  public setRandomAvatar(status: boolean) {
    const auth = this.auth();
    auth.randomIcon = status;

    this.auth.update((auth) => ({ ...auth, randomIcon: status }));
    localStorage.setItem('auth', JSON.stringify(auth));
  }
}
