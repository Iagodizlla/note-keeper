import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificacaoService {
  protected readonly snackBar = inject(MatSnackBar);

  public sucesso(mensagem: string): void {
    this.snackBar.open(mensagem, 'OK', {
      panelClass: ['notificacao-sucesso'],
    });
  }

  public aviso(mensagem: string): void {
    this.snackBar.open(mensagem, 'OK', {
      panelClass: ['notificacao-aviso'],
    });
  }

  public erro(mensagem: string): void {
    this.snackBar.open(mensagem, 'OK', {
      panelClass: ['notificacao-erro'],
    });
  }
}