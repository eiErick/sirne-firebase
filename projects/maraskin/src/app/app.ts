import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

if (Capacitor.getPlatform() !== 'web') {
  StatusBar.setOverlaysWebView({ overlay: false });
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  protected readonly title = signal('maraskin');

  public darkMode = false;

  constructor() {
    this.initializeApp();
  }

  public async initializeApp() {
    this.initTheme();

    if (Capacitor.getPlatform() !== 'web') {
      await App.addListener('appStateChange', async () => {
        await StatusBar.setOverlaysWebView({ overlay: true });
      });

      await StatusBar.setOverlaysWebView({ overlay: true });
    }
  }

  private initTheme() {
    const storedTheme = localStorage.getItem('dark-mode');

    if (storedTheme) {
      const theme = JSON.parse(storedTheme);

      if (theme) {
        document.documentElement.classList.add('app-dark');

        if (Capacitor.getPlatform() !== 'web') {
          StatusBar.setBackgroundColor({ color: '#7662DA' });
          StatusBar.setStyle({ style: Style.Dark });
        }
      } else {
        document.documentElement.classList.add('app-light');

        if (Capacitor.getPlatform() !== 'web') {
          StatusBar.setBackgroundColor({ color: '#423671' });
          StatusBar.setStyle({ style: Style.Dark });
        }
      }
    } else {
      document.documentElement.classList.add('app-light');
      localStorage.setItem('dark-mode', 'false');
    }
  }
}