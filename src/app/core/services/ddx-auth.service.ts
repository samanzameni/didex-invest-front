import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as jwtDecode from 'jwt-decode';

import {
  AuthFormData,
  AuthFormResponse,
  AuthResetPasswordFormData,
  AuthEmailActivationData,
  AuthResetPasswordData,
} from '../models';
import { AuthRESTService } from './REST';
import { StorageService } from './ddx-storage.service';
import { TraderService } from './ddx-trader.service';

@Injectable()
export class AuthService {
  private isUserAuthorized: boolean;

  constructor(
    private restService: AuthRESTService,
    private storageService: StorageService,
    private router: Router,
    private traderService: TraderService
  ) {
    this.isUserAuthorized = !!this.storageService.getUserAccessToken();
  }

  get isAuthorized(): boolean {
    return this.isUserAuthorized;
  }

  get decodedToken(): any {
    return this.isUserAuthorized
      ? jwtDecode(this.storageService.getUserAccessToken())
      : {};
  }

  public requestSignUp(formData: AuthFormData): Observable<AuthFormResponse> {
    return this.restService.requestRegister(formData);
  }

  public requestNewPassword(formData: AuthResetPasswordData): Observable<any> {
    return this.restService.requestNewPassword(formData);
  }

  public requestSignIn(formData: AuthFormData): Observable<AuthFormResponse> {
    return this.restService.requestLogin(formData).pipe(
      tap((response) => {
        this.storageService.setUserAccessToken({
          didexAccessToken: response.token,
        });
        this.isUserAuthorized = true;
      })
    );
  }

  public requestVerifyEmail(
    data: AuthEmailActivationData
  ): Observable<AuthFormResponse> {
    return this.restService.requestVerifyEmail(data).pipe(
      tap((response) => {
        this.storageService.setUserAccessToken({
          didexAccessToken: response.token,
        });
        this.isUserAuthorized = true;
      })
    );
  }

  public requestResetPassword(
    formData: AuthResetPasswordFormData
  ): Observable<any> {
    return this.restService.requestResetPassword(formData);
  }

  public requestSignOut(): void {
    this.storageService.clearUserToken();
    this.isUserAuthorized = false;
    this.traderService.removeCurrentTrader();
    this.traderService.removeCurrentTraderImages();
    this.router.navigateByUrl('/');
  }

  public handleAuthError(): void {
    alert(
      'Your token is expired or is not valid. You will get redirected to the sign in page.'
    );
    this.storageService.clearUserToken();
    this.isUserAuthorized = false;
    this.traderService.removeCurrentTrader();
    this.traderService.removeCurrentTraderImages();
    this.router.navigateByUrl('/auth/signin');
  }
}
