import { NgModule } from '@angular/core';
import { RESTModule } from '@core/modules/rest.module';
import {
  AuthService,
  StorageService,
  TraderService,
  TawkToService,
} from '@core/services';

@NgModule({
  declarations: [],
  imports: [RESTModule],
  providers: [AuthService, StorageService, TraderService, TawkToService],
  bootstrap: [],
})
export class CoreModule {}
