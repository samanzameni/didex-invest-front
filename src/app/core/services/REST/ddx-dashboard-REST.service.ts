import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../ddx-storage.service';
import { AbstractRESTService } from '../../templates';
import {
  OpenInvestmentData,
  CloseInvestmentData,
} from '../../models/ddx-investment-data.model';

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
