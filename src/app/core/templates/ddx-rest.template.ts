import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

import { StorageService } from '@core/services/ddx-storage.service';
import { LocaleService } from '@core/services/ddx-locale.service';
import { CONSTANTS } from '@core/util/constants';

@Injectable()
export abstract class AbstractRESTService {
  constructor(
    protected storageService: StorageService,
    protected http: HttpClient,
    protected localeService: LocaleService
  ) {
    this.baseURL = environment.production
      ? CONSTANTS.SERVER_URL
      : CONSTANTS.MOCK_SERVER_URL;

    this.userAccessToken = this.storageService.getUserAccessToken();
  }
  private userAccessToken: string;
  protected baseURL: string;

  /**
   * Sets the header with bearer token authorization appended to it.
   *
   */
  /**
   * Sends a POST request with custom headers
   *
   */

  /**
   * Sends a custom request to ANY url WITHOUT custom headers,
   * so be careful using this.
   *
   */
  protected httpAbsoluteRequest(
    url: string,
    method: string,
    body?: object
  ): Observable<any> {
    switch (method) {
      case 'GET':
        return this.http.get(url);
      case 'POST':
        return this.http.post(url, body);
      case 'PUT':
        return this.http.put(url, body);
      case 'DELETE':
        return this.http.delete(url);
      default:
        return undefined;
    }
  }

  /**
   * Sends a custom request to the url + base WITHOUT custom headers,
   * so be careful using this.
   *
   */
  protected httpPureRequest(
    url: string,
    method: string,
    body?: object
  ): Observable<any> {
    url = this.baseURL.concat(url);
    switch (method) {
      case 'GET':
        return this.http.get(url);
      case 'POST':
        return this.http.post(url, body);
      case 'PUT':
        return this.http.put(url, body);
      case 'DELETE':
        return this.http.delete(url);
      default:
        return undefined;
    }
  }

  /**
   * Sends a GET request with custom headers
   *
   */
  public httpGET(url: string): Observable<any> {
    return this.http.get(this.baseURL.concat(url), {
      headers: this.getFullHeaders(),
    });
  }
  public httpPOST(url: string, body: object): Observable<any> {
    return this.http.post(this.baseURL.concat(url), body, {
      headers: this.getFullHeaders(),
    });
  }

  /**
   * Sends a POST request with formData body type and custom headers
   *
   */
  public httpPOSTFormData(url: string, formData: FormData): Observable<any> {
    return this.http.post(this.baseURL.concat(url), formData, {
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Sends a PUT request with custom headers
   *
   */
  public httpPUT(url: string, body: object): Observable<any> {
    return this.http.put(this.baseURL.concat(url), body, {
      headers: this.getFullHeaders(),
    });
  }

  /**
   * Sends a PATCH request with custom headers
   *
   */
  public httpPATCH(url: string, body: object): Observable<any> {
    return this.http.patch(this.baseURL.concat(url), body, {
      headers: this.getFullHeaders(),
    });
  }

  /**
   * Sends a DELETE request with custom headers
   *
   */
  public httpDELETE(url: string): Observable<any> {
    return this.http.delete(this.baseURL.concat(url), {
      headers: this.getFullHeaders(),
    });
  }
  private getFullHeaders(): HttpHeaders {
    this.userAccessToken = this.storageService.getUserAccessToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.userAccessToken}`,
      'Content-Type': 'application/json; charset=utf-8',
      'Accept-Language': this.localeService.currentLocale,
    });
    return headers;
  }

  private getAuthHeaders(): HttpHeaders {
    this.userAccessToken = this.storageService.getUserAccessToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.userAccessToken}`,
      'Accept-Language': this.localeService.currentLocale,
    });
    return headers;
  }
}
