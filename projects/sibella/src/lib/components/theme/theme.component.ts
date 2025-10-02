import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Toggle } from "../toggle/toggle";

@Component({
  selector: 'lib-theme',
  imports: [
    FormsModule,
    MatSlideToggleModule,
    Toggle
],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent {
  public value = input.required<boolean>();
  public change = output<boolean>();
  public isDarkMode: boolean = false;

  ngOnInit() {
    this.isDarkMode = this.value();
  }

  public toggleTheme() {
    this.change.emit(this.isDarkMode);
  }
}
