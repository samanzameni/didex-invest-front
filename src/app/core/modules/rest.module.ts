import { NgModule } from '@angular/core';
import {
  AuthRESTService,
  TraderRESTService,
  DashboardRESTService,
} from '../services/REST';

@NgModule({
  declarations: [],
  imports: [],
  providers: [AuthRESTService, TraderRESTService, DashboardRESTService],
  bootstrap: [],
})
export class RestModule {}
