import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { AccessTokenModel, LoginModel, RegistroModel } from './auth.models';

@Injectable()
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/auth';

  public readonly accessTokenSubject$ = new BehaviorSubject<AccessTokenModel | undefined>(
    undefined,
  );

  public readonly accessToken$ = this.accessTokenSubject$.pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public registro(registroModel: RegistroModel): Observable<AccessTokenModel> {
    const urlCompleto = `${this.apiUrl}/registro`;

    return this.http
      .post<AccessTokenModel>(urlCompleto, registroModel)
      .pipe(tap((token) => this.accessTokenSubject$.next(token)));
  }

  public login(loginModel: LoginModel): Observable<AccessTokenModel> {
    const urlCompleto = `${this.apiUrl}/login`;

    return this.http
      .post<AccessTokenModel>(urlCompleto, loginModel)
      .pipe(tap((token) => this.accessTokenSubject$.next(token)));
  }

  public sair(): Observable<null> {
    const urlCompleto = `${this.apiUrl}/sair`;

    return this.http
      .post<null>(urlCompleto, {})
      .pipe(tap(() => this.accessTokenSubject$.next(undefined)));
  }
}
