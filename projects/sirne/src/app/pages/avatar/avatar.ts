import { Component, computed, OnDestroy, OnInit } from '@angular/core';
import { SettingsService, SnackbarService } from 'cerebellum';
import { CommonModule, Location } from '@angular/common';
import { HeaderComponent, RandomAvatar } from 'sibella';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-avatar',
  imports: [CommonModule, HeaderComponent, RandomAvatar],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
})
export class Avatar implements OnInit, OnDestroy {
  public auth = computed(() => this.settingsService.auth());
  public avatars: string[];
  private backButtonListener: any;
  public img = '';

  constructor(
    private location: Location,
    private settingsService: SettingsService,
    private snackbar: SnackbarService
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

  fileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.img = reader.result as string;
      localStorage.setItem('imagem', this.img);
      this.settingsService.setIcon(this.img);
      this.avatarRandom(false);
      this.snackbar.showSuccess('Avatar selecionado com sucesso!');
    };

    reader.readAsDataURL(file);
  }
}
