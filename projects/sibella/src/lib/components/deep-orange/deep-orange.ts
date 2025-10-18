import { Component, input, output } from '@angular/core';
import { Toggle } from "../toggle/toggle";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-deep-orange',
  imports: [
    Toggle,
    FormsModule
  ],
  templateUrl: './deep-orange.html',
  styleUrl: './deep-orange.scss'
})
export class DeepOrange {
  public value = input.required<boolean>();
  public change = output<boolean>();
  public isOrange: boolean = false;

  ngOnInit() {
    this.isOrange = this.value();
  }

  public toggleOrange() {
    this.change.emit(this.isOrange);
  }
}
