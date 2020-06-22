import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractRESTService } from '@core/templates';
import { StorageService } from '@core/services/ddx-storage.service';
import {
  AuthFormData,
  AuthFormResponse,
  AuthResetPasswordFormData,
  AuthResetPasswordData,
  AuthEmailActivationData,
} from '@core/models';
import { LocaleService } from '../ddx-locale.service';

@Injectable()
export class AuthRESTService extends AbstractRESTService {
  constructor(
    protected storageService: StorageService,
    protected http: HttpClient,
    protected localeService: LocaleService
  ) {
    super(storageService, http, localeService);
  }

  public requestRegister(data: AuthFormData): Observable<AuthFormResponse> {
    return this.httpPureRequest(
      `api/Account/register`,
      'POST',
      data
    ) as Observable<AuthFormResponse>;
  }

  public requestLogin(data: AuthFormData): Observable<AuthFormResponse> {
    return this.httpPureRequest(
      `api/Account/login`,
      'POST',
      data
    ) as Observable<AuthFormResponse>;
  }

  public requestResetPassword(
    data: AuthResetPasswordFormData
  ): Observable<any> {
    return this.httpPureRequest(
      `api/Account/requestResetPassword`,
      'POST',
      data
    ) as Observable<any>;
  }

  public requestNewPassword(data: AuthResetPasswordData): Observable<any> {
    return this.httpPureRequest(
      `api/Account/resetPassword`,
      'POST',
      data
    ) as Observable<any>;
  }

  public requestVerifyEmail(
    data: AuthEmailActivationData
  ): Observable<AuthFormResponse> {
    return this.httpPureRequest(
      `api/Account/verifyEmail`,
      'POST',
      data
    ) as Observable<AuthFormResponse>;
  }

  public requestChangePassword(data: any): Observable<any> {
    return this.httpPOST(`api/Account/changePassword`, data) as Observable<any>;
  }
}
