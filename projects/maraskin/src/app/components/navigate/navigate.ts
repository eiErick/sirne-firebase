import { Component, computed } from '@angular/core';
import { NavigateService } from '../../services/navigate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigate',
  imports: [
    CommonModule
  ],
  templateUrl: './navigate.html',
  styleUrl: './navigate.scss'
})
export class Navigate {
  public navigate = computed(() => this.navigateService.navigate());

  constructor(
    private navigateService: NavigateService
  ) {}

  public browse(nav: 'menu' | 'snack' | 'lunch') {
    this.navigateService.navigate.set(nav);
  }
}
