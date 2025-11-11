import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';
import { PlataformService } from 'cerebellum';
import { Capacitor } from '@capacitor/core';

if (Capacitor.isNativePlatform()) {
  const enableEdgeToEdge = async () => {
    await EdgeToEdge.enable();
  };

  enableEdgeToEdge();
}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  protected readonly title = signal('sirne');

  private isNative: boolean = false;

  public darkMode = false;

  constructor(
    private plataformService: PlataformService
  ) {
    this.initializeApp();
  }

  public async initializeApp() {
    this.initTheme();

    this.isNative = this.plataformService.isNative;

    if (this.isNative) {
      await StatusBar.setOverlaysWebView({ overlay: false });
    }
  }

  private initTheme() {
    const storedTheme = localStorage.getItem('dark-mode');
    const storedOrange = localStorage.getItem('deep-orange-mode');

    let deepOrange: boolean = false;

    if (storedOrange) {
      deepOrange = JSON.parse(storedOrange);

    }

    if (deepOrange) {
      document.documentElement.classList.add('app-deep-orange');
    } else {
      document.documentElement.classList.add('app-orange');
    }

    if (storedTheme) {
      const theme = JSON.parse(storedTheme);

      if (theme) {
        document.documentElement.classList.add('app-dark');

        if (this.isNative) {
          if (deepOrange) {
            EdgeToEdge.setBackgroundColor({ color: '#ff6600' });
            StatusBar.setBackgroundColor({ color: '#ff6600' });
            StatusBar.setStyle({ style: Style.Dark });
          } else {
            EdgeToEdge.setBackgroundColor({ color: '#16161A' });
            StatusBar.setBackgroundColor({ color: '#16161A' });
            StatusBar.setStyle({ style: Style.Dark });
          }
        }
      } else {
        document.documentElement.classList.add('app-light');

        if (this.isNative) {
          if (deepOrange) {
            EdgeToEdge.setBackgroundColor({ color: '#ff6600' });
            StatusBar.setBackgroundColor({ color: '#ff6600' });
            StatusBar.setStyle({ style: Style.Dark });
          } else {
            EdgeToEdge.setBackgroundColor({ color: '#EAEAEC' });
            StatusBar.setBackgroundColor({ color: '#EAEAEC' });
            StatusBar.setStyle({ style: Style.Light });
          }
        }
      }
    } else {
      document.documentElement.classList.add('app-light');
      localStorage.setItem('dark-mode', 'false');

      if (this.isNative) {
        if (deepOrange) {
          EdgeToEdge.setBackgroundColor({ color: '#ff6600' });
          StatusBar.setBackgroundColor({ color: '#ff6600' });
          StatusBar.setStyle({ style: Style.Dark });
        } else {
          EdgeToEdge.setBackgroundColor({ color: '#EAEAEC' });
          StatusBar.setBackgroundColor({ color: '#EAEAEC' });
          StatusBar.setStyle({ style: Style.Light });
        }
      }
    }
  }
}
