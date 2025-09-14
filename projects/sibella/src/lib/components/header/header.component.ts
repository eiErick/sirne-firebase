import { Component, computed, input, output } from '@angular/core';
import { SettingsService, KiamService } from 'cerebellum';

@Component({
  selector: 'lib-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public title = input.required<string>();
  public activeIcon = input<boolean>(true);
  public activeBack = input<boolean>(false);
  public activeKiam = input<boolean>(true);
  public load = input(false);
  public settings = output();
  public icon = computed(() => this.settingsService.auth().icon);
  public back = output();

  constructor(
    private kiamService: KiamService,
    private settingsService: SettingsService
  ) { }

  public openSettings() {
    this.settings.emit();
  }

  public kiam() {
    if (this.activeKiam()) this.kiamService.play();
  }

  public onBack() {
    this.back.emit();
  }
}
