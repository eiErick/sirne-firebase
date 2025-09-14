import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KiamService {
  private currentAudio: HTMLAudioElement | null = null;

  public play() {
    if (!this.currentAudio || this.currentAudio.paused) {
      this.currentAudio = new Audio("assets/sounds/kiam.mp3");
      this.currentAudio.play();
    }
  }
}
