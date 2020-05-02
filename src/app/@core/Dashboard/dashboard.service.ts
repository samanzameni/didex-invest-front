import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OpenClose} from './open-close';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJzdXBlckBnbWFpbC5jb20iLCJqdGkiOiIwZjJmOWM0OC04NzgyLTQ1NTMtYTJiOS02MDkxY2FkZWY3MjgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsic3VwZXJVc2VyIiwibW9kZXJhdG9yIl0sImV4cCI6MTU4ODc2MzQ0MywiaXNzIjoiRGlkZXggQ29ycCIsImF1ZCI6IkRpZGV4IENvcnAifQ.SlTZslKQl9K0GkvsojU6OVK8Y7Bew-ElHiazylrKgM4'
  ServerUrl = 'https://devapi.didex.com/api/';
  httpOptions = {
    headers: new HttpHeaders({ accept: 'text/plain',
        Authorization: 'Bearer ' + this.token,
      },
    ),
  };
  getFunds(): Observable<any> {
    return this.http.get
    (this.ServerUrl + 'Invest/funds', this.httpOptions );
  }
  getRecords(): Observable<any> {
    return this.http.get
    (this.ServerUrl + 'Invest/records', this.httpOptions );
  }
  postOpen( formdata: OpenClose ): Observable<any> {
    return this.http.post
    (this.ServerUrl + 'Invest/open' , formdata, this.httpOptions );
  }
  postClose(formdata: OpenClose ): Observable<any> {
    return this.http.post
    (this.ServerUrl + 'Invest/close', formdata, this.httpOptions  );
  }
}
