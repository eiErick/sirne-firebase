import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate(): boolean {
    const saved = localStorage.getItem('auth');
    let password = '';

    if (saved !== null) {
      password = JSON.parse(saved).appid;
    }

    if (password === 'SMSC2025') {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}