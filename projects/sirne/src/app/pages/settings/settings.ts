import { Component, computed, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, SettingsService } from 'cerebellum';
import { HeaderComponent, AvatarComponent, ThemeComponent, ScheduleComponent, CreditsComponent, SiglaComponent, Support } from "sibella";
import { Location } from '@angular/common';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-settings',
  imports: [
    HeaderComponent,
    AvatarComponent,
    ThemeComponent,
    ScheduleComponent,
    CreditsComponent,
    SiglaComponent,
    Support
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings implements OnInit, OnDestroy {
  public isDarkMode: boolean = false;
  public auth = computed(() => this.settingsService.auth());
  private backButtonListener: any;

  constructor(
    private location: Location,
    private router: Router,
    private settingsService: SettingsService
  ) {
    this.loadTheme();
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

  public toggleTheme(darkMode: boolean) {
    if (darkMode) {
      document.documentElement.classList.remove('app-light');
      document.documentElement.classList.add('app-dark');
    } else {
      document.documentElement.classList.remove('app-dark');
      document.documentElement.classList.add('app-light');
    }

    localStorage.setItem('dark-mode', darkMode.toString());
  }

  public openAvatar() {
    this.router.navigate(['avatar']);
  }

  public back() {
    this.location.back();
  }
}
