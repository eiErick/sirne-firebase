import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offline',
  imports: [MatButtonModule],
  templateUrl: './offline.component.html',
  styleUrl: './offline.component.scss'
})
export class OfflineComponent {
  constructor(
    private router: Router
  ) { }

  public home() {
    this.router.navigate(['home']);
  }
}
