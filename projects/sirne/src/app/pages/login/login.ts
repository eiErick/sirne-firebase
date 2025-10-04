import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Auth } from 'cerebellum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  public loginSel: Auth = { appid: '', appkey: '', icon: '', name: 'Estudante', randomIcon: false };

  constructor(
    private router: Router
  ) {}

  public login() {
    localStorage.setItem('auth', JSON.stringify(this.loginSel));
    this.router.navigate(['home']);
  }
}
