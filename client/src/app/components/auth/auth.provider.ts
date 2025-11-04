import {
    HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors
} from '@angular/common/http';
import { EnvironmentProviders, inject, makeEnvironmentProviders } from '@angular/core';

import { AuthService } from './auth.service';

const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);

  const accessToken = authService.accessTokenSubject$.getValue();

  if (accessToken) {
    const requisicaoClonada = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken.chave}`),
    });

    return next(requisicaoClonada);
  }

  return next(req);
};

export const provideAuth = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    provideHttpClient(withInterceptors([authInterceptor])),
    AuthService,
  ]);
};
