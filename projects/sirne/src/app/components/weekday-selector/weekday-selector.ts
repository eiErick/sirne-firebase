import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-weekday-selector',
  imports: [
    CommonModule
  ],
  templateUrl: './weekday-selector.html',
  styleUrl: './weekday-selector.scss'
})
export class WeekdaySelector {
  public change = output<dayOption[]>();

  public options = ([
    { name: 'Seg', id: 'mon', check: false },
    { name: 'Ter', id: 'tue', check: false },
    { name: 'Qua', id: 'wed', check: false },
    { name: 'Qui', id: 'thu', check: false },
    { name: 'Sex', id: 'fri', check: false },
  ]);

  public toggleOption(option: any) {
    option.check = !option.check;
    this.change.emit(this.options);
  }
}

export interface dayOption {
  name: string,
  id: string,
  check: boolean
}
