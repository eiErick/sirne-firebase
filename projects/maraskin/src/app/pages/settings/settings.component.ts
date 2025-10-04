import { Component, computed, OnDestroy, OnInit } from '@angular/core';
import { Auth, SettingsService } from 'cerebellum';
import { Location } from '@angular/common';
import { HeaderComponent, AvatarComponent, ThemeComponent, ScheduleComponent, CreditsComponent, SiglaComponent, Support } from "sibella";
import { Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
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
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit, OnDestroy {
  public isDarkMode: boolean = false;
  public auth = computed(() => this.settingsService.auth());
  private backButtonListener: any;

  constructor(
    private location: Location,
    private router: Router,
    private settingsService: SettingsService,
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
  //     this.auth = auth;
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

      StatusBar.setBackgroundColor({ color: '#7662DA' });
      StatusBar.setStyle({ style: Style.Dark });
    } else {
      document.documentElement.classList.remove('app-dark');
      document.documentElement.classList.add('app-light');

      StatusBar.setBackgroundColor({ color: '#423671' });
      StatusBar.setStyle({ style: Style.Dark });
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
