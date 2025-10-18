import { Component, computed, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, SettingsService } from 'cerebellum';
import { HeaderComponent, AvatarComponent, ThemeComponent, ScheduleComponent, CreditsComponent, SiglaComponent, Support, DeepOrange } from "sibella";
import { Location } from '@angular/common';
import { App } from '@capacitor/app';
import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-settings',
  imports: [
    HeaderComponent,
    AvatarComponent,
    ThemeComponent,
    ScheduleComponent,
    CreditsComponent,
    SiglaComponent,
    Support,
    DeepOrange
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings implements OnInit, OnDestroy {
  public isDarkMode: boolean = false;
  public isOrangeMode: boolean = false;
  public auth = computed(() => this.settingsService.auth());
  private backButtonListener: any;

  constructor(
    private location: Location,
    private router: Router,
    private settingsService: SettingsService
  ) {
    this.loadTheme();
    this.loadOrange();
    // this.getSetting();
  }

  ngOnInit() {
    this.backButtonListener = App.addListener('backButton', (event: { canGoBack: boolean }) => {
      if (event.canGoBack) {
        window.history.back();
      } else {
        if (confirm('Deseja realmente sair do app?')) {
          App.exitApp();
        }
      }
    });
  }

  ngOnDestroy() {
    this.backButtonListener.remove();
  }

  // private getSetting() {
  //   const authSaved = localStorage.getItem('auth');

  //   if (authSaved !== null) {
  //     const auth: Auth = JSON.parse(authSaved);
  //     // this.auth = auth;
  //   }
  // }

  public loadTheme() {
    const storedTheme = localStorage.getItem('dark-mode');

    if (storedTheme) {
      const theme = JSON.parse(storedTheme);
      this.isDarkMode = theme;
    } else {
      this.isDarkMode = false
    }
  }

  public loadOrange() {
    const storedTheme = localStorage.getItem('deep-orange-mode');

    if (storedTheme) {
      const theme = JSON.parse(storedTheme);
      this.isOrangeMode = theme;
    } else {
      this.isOrangeMode = false
    }
  }

  public toggleTheme(darkMode: boolean) {
    this.isDarkMode = darkMode;

    if (darkMode) {
      document.documentElement.classList.remove('app-light');
      document.documentElement.classList.add('app-dark');

      if (!this.isOrangeMode) {
        EdgeToEdge.setBackgroundColor({ color: '#16161A' });
        StatusBar.setBackgroundColor({ color: '#16161A' });
        StatusBar.setStyle({ style: Style.Dark });
      }
    } else {
      document.documentElement.classList.remove('app-dark');
      document.documentElement.classList.add('app-light');

      if (!this.isOrangeMode) {
        EdgeToEdge.setBackgroundColor({ color: '#EAEAEC' });
        StatusBar.setBackgroundColor({ color: '#EAEAEC' });
        StatusBar.setStyle({ style: Style.Light });
      }
    }

    localStorage.setItem('dark-mode', darkMode.toString());
  }

  public toggleOrange(deepOrange: boolean) {
    this.isOrangeMode = deepOrange;

    if (deepOrange) {
      document.documentElement.classList.remove('app-orange');
      document.documentElement.classList.add('app-deep-orange');

      EdgeToEdge.setBackgroundColor({ color: '#ff6600' });
      StatusBar.setBackgroundColor({ color: '#ff6600' });
      StatusBar.setStyle({ style: Style.Dark });
    } else {
      document.documentElement.classList.remove('app-deep-orange');
      document.documentElement.classList.add('app-orange');

      if (this.isDarkMode) {
        EdgeToEdge.setBackgroundColor({ color: '#16161A' });
        StatusBar.setBackgroundColor({ color: '#16161A' });
        StatusBar.setStyle({ style: Style.Dark });
      } else {
        EdgeToEdge.setBackgroundColor({ color: '#EAEAEC' });
        StatusBar.setBackgroundColor({ color: '#EAEAEC' });
        StatusBar.setStyle({ style: Style.Light });
      }
    }

    localStorage.setItem('deep-orange-mode', deepOrange.toString());
  }

  public openAvatar() {
    this.router.navigate(['avatar']);
  }

  public back() {
    this.location.back();
  }
}
