import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('maraskin');

  public darkMode = false;

  constructor() {
    this.initializeApp();
  }

  public initializeApp() {
    this.initTheme();
  }

  private initTheme() {
    const storedTheme = localStorage.getItem('dark-mode');

    if (storedTheme) {
      const theme = JSON.parse(storedTheme);

      if (theme) {
        document.documentElement.classList.add('app-dark');
        StatusBar.setBackgroundColor({ color: '#7662DA' });
        StatusBar.setStyle({ style: Style.Dark });
      } else {
        document.documentElement.classList.add('app-light');
        StatusBar.setBackgroundColor({ color: '#423671' });
        StatusBar.setStyle({ style: Style.Dark });
      }
    } else {
      document.documentElement.classList.add('app-light');
      localStorage.setItem('dark-mode', 'false');
    }
  }
}
