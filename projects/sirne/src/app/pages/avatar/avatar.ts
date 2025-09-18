import { Component, computed, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from 'cerebellum';
import { CommonModule, Location } from '@angular/common';
import { HeaderComponent } from 'sibella';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-avatar',
  imports: [
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss'
})
export class Avatar implements OnInit, OnDestroy {
  public auth = computed(() => this.settingsService.auth());
  private backButtonListener: any;

  constructor(
    private location: Location,
    private settingsService: SettingsService
  ) { }

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

  public back() {
    this.location.back();
  }

  public selectAvatar(path: string) {
    this.settingsService.setIcon(path);
  }
}
