import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-delete-confirm-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './delete-confirm-dialog.html',
  styleUrl: './delete-confirm-dialog.scss'
})
export class DeleteConfirmDialog {
  private readonly dialogRef = inject(MatDialogRef<DeleteConfirmDialog>);
  private readonly data = inject<string>(MAT_DIALOG_DATA);

  public text: string = "Você realmente deseja deletar?";

  constructor() {
    if (this.data != null) this.text = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }
}
