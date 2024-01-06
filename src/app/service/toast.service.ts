import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {
  }

  showSuccess(content: string, header = 'BAŞARILI') {
    this.snackBar.open(content, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  showError(content: string, header = 'HATA') {
    this.snackBar.open(content, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  showWarning(content: string, header = 'UYARI') {
    this.snackBar.open(content, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  showInfo(content: string, header = 'BİLGİLENDİRME') {
    this.snackBar.open(content, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }
}
