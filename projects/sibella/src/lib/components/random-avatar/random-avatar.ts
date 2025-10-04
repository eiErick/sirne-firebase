import { Component, effect, input, output } from '@angular/core';
import { Toggle } from "../toggle/toggle";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-random-avatar',
  imports: [
    Toggle,
    FormsModule
  ],
  templateUrl: './random-avatar.html',
  styleUrl: './random-avatar.scss'
})
export class RandomAvatar {
  public randomValue = input.required<boolean>();
  public change = output<boolean>();
  public randomSel: boolean = false;

  constructor() {
    effect(() => {
      this.randomSel = this.randomValue();
    })
  }

  ngOnInit() {    
    this.randomSel = this.randomValue();
  }

  public random() {
    this.change.emit(this.randomSel);
  }
}
