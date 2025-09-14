import { Component, input, output } from '@angular/core';

@Component({
  selector: 'lib-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  public name = input.required<string>();
  public icon = input.required<string>();
  public avatar = output();

  public async avatarSelector() {
    this.avatar.emit();
  }
}
