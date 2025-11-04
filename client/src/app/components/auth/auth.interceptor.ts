import { catchError, throwError } from 'rxjs';

import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { NotificacaoService } from '../shared/notificacao/notificacao.service';
import { AuthService } from './auth.service';

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const notificacaoService = inject(NotificacaoService);

  const accessToken = authService.accessTokenSubject$.getValue();

  if (accessToken) {
    const requisicaoClonada = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken.chave}`),
    });

    return next(requisicaoClonada).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          notificacaoService.erro('A sua sessão foi expirada. Por favor, faça login novamente.');

          authService.accessTokenSubject$.next(undefined);

          router.navigate(['/auth', 'login']);
        }

        return throwError(() => err);
      }),
    );
  }

  return next(req);
};
