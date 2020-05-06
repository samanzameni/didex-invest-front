import { NgModule } from '@angular/core';
import {
  AuthRESTService,
  TraderRESTService,
  DashboardRESTService,
} from '@core/services/REST';

@NgModule({
  declarations: [],
  imports: [],
  providers: [AuthRESTService, TraderRESTService, DashboardRESTService],
  bootstrap: [],
})
export class RestModule {}
