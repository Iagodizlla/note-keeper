import { BehaviorSubject, shareReplay } from 'rxjs';

import { Injectable } from '@angular/core';

import { AccessTokenModel } from './auth.models';

@Injectable()
export class AuthService {
  public readonly accessTokenSubject$ = new BehaviorSubject<AccessTokenModel | undefined>(
    undefined,
  );

  public readonly accessToken$ = this.accessTokenSubject$.pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );
}
