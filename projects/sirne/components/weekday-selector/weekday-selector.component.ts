import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dayOption } from '../../pages/menu/menu.page';

@Component({
  selector: 'app-weekday-selector',
  templateUrl: './weekday-selector.component.html',
  styleUrls: ['./weekday-selector.component.scss'],
  imports: [
    CommonModule
  ]
})
export class WeekdaySelectorComponent {
  public change = output<dayOption[]>();

  public options = ([
    { name: 'Seg', id: 1, check: false },
    { name: 'Ter', id: 2, check: false },
    { name: 'Qua', id: 3, check: false },
    { name: 'Qui', id: 4, check: false },
    { name: 'Sex', id: 5, check: false },
  ]);

  public toggleOption(option: any) {
    option.check = !option.check;
    this.change.emit(this.options);
  }
}
