import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '@core/services';
import { AbstractRESTService } from '@core/templates';
import { OpenInvestmentData, CloseInvestmentData } from '@core/models';

@Injectable()
export class DashboardRESTService extends AbstractRESTService {
  constructor(
    protected storageService: StorageService,
    protected http: HttpClient
  ) {
    super(storageService, http);
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
