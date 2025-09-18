import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(
    private snackBar: MatSnackBar
  ) { }

  public showSuccess(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'OK', {
      duration: duration,
      panelClass: ['snack-success']
    });
  }

  public showError(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Fechar', {
      duration: duration,
      panelClass: ['snack-error']
    });
  }
}
