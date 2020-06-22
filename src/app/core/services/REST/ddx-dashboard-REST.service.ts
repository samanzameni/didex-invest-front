import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '@core/services/ddx-storage.service';
import { AbstractRESTService } from '@core/templates';
import { OpenInvestmentData, CloseInvestmentData } from '@core/models';
import { LocaleService } from '../ddx-locale.service';

@Injectable()
export class DashboardRESTService extends AbstractRESTService {
  constructor(
    protected storageService: StorageService,
    protected http: HttpClient,
    protected localeService: LocaleService
  ) {
    super(storageService, http, localeService);
  }

  getFunds(): Observable<any> {
    return this.httpGET('api/Invest/funds');
  }

  getRecords(): Observable<any> {
    return this.httpGET('api/Invest/records');
  }

  postOpen(formdata: OpenInvestmentData): Observable<any> {
    return this.httpPOST('api/Invest/open', formdata);
  }

  postClose(formdata: CloseInvestmentData): Observable<any> {
    return this.httpPOST('api/Invest/close', formdata);
  }
}
