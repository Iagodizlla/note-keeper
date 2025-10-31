import { PartialObserver } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AuthService } from './components/auth/auth.service';
import { NotificacaoService } from './components/shared/notificacao/notificacao.service';
import { ShellComponent } from './components/shared/shell/shell.component';

@Component({
  selector: 'app-root',
  template: `
    @if (accessToken$ | async; as accessToken) {
      <app-shell
        [usuarioAutenticado]="accessToken.usuarioAutenticado"
        (logoutRequisitado)="logout()"
      >
        <router-outlet></router-outlet>
      </app-shell>
    } @else {
      <main class="container-fluid py-3">
        <router-outlet></router-outlet>
      </main>
    }
  `,
  imports: [ShellComponent, RouterOutlet, AsyncPipe],
})
export class App {
  protected readonly router = inject(Router);
  protected readonly authService = inject(AuthService);
  protected readonly notificacaoService = inject(NotificacaoService);
  protected readonly accessToken$ = this.authService.accessToken$;

  public logout() {
    const sairObserver: PartialObserver<null> = {
      error: (err) => this.notificacaoService.erro(err.message),
      complete: () => this.router.navigate(['/auth/login']),
    };

    this.authService.sair().subscribe(sairObserver);
  }
}