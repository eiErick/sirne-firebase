import { Component, computed, OnDestroy, OnInit } from '@angular/core';
import { SettingsService, SnackbarService } from 'cerebellum';
import { CommonModule, Location } from '@angular/common';
import { HeaderComponent, RandomAvatar } from 'sibella';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-avatar',
  imports: [
    CommonModule,
    HeaderComponent,
    RandomAvatar
  ],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss'
})
export class Avatar implements OnInit, OnDestroy {
  public auth = computed(() => this.settingsService.auth());
  public avatars: string[];
  private backButtonListener: any;

  constructor(
    private location: Location,
    private settingsService: SettingsService,
    private snackbar: SnackbarService,
  ) {
    this.avatars = this.settingsService.avatars;
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

  public back() {
    this.location.back();
  }

  public avatarRandom(status: boolean) {
    this.settingsService.setRandomAvatar(status);
  }

  public selectAvatar(path: string) {
    this.settingsService.setIcon(path);
    this.avatarRandom(false);
    this.snackbar.showSuccess('Avatar selecionado com sucesso!');
  }
}
