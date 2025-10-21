import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-my-avatar',
  imports: [],
  templateUrl: './my-avatar.html',
  styleUrl: './my-avatar.scss',
})
export class MyAvatar {
  public img = '';

  @Output() change = new EventEmitter<string>();

  public fileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.img = reader.result as string;
      localStorage.setItem('imagem', this.img);
      this.change.emit(this.img);
    };

    reader.readAsDataURL(file);
  }
}
