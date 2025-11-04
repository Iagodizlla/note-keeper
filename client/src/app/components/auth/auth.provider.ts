import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { authInterceptor } from './auth.interceptor';

import { AuthService } from './auth.service';

export const provideAuth = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    provideHttpClient(withInterceptors([authInterceptor])),
    AuthService,
  ]);
};
