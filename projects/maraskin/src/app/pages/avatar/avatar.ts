import { Component, computed } from '@angular/core';
import { HeaderComponent } from "sibella";
import { CommonModule, Location } from '@angular/common';
import { SettingsService } from 'cerebellum';

@Component({
  selector: 'app-avatar',
  imports: [
    HeaderComponent,
    CommonModule
  ],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss'
})
export class Avatar {
  public auth = computed(() => this.settingsService.auth());

  constructor(
    private location: Location,
    private settingsService: SettingsService
  ) { }

  public back() {
    this.location.back();
  }

  public selectAvatar(path: string) {
    this.settingsService.setIcon(path);
  }
}
