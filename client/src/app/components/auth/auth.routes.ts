import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { AuthService } from './auth.service';

export const provideAuth = (): EnvironmentProviders => {
  return makeEnvironmentProviders([AuthService]);
};
