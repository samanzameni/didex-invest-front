import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OpenClose } from 'app/@core/Dashboard/open-close';
import { StorageService } from '../ddx-storage.service';
import { AbstractRESTService } from '@core/templates';

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

  postOpen(formdata: OpenClose): Observable<any> {
    return this.httpPOST('api/Invest/open', formdata);
  }

  postClose(formdata: OpenClose): Observable<any> {
    return this.httpPOST('api/Invest/close', formdata);
  }
}
