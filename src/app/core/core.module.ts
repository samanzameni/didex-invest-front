import { NgModule } from '@angular/core';
import { RESTModule } from '@core/modules/rest.module';
import { AuthService, StorageService, TraderService } from '@core/services';

@NgModule({
  declarations: [],
  imports: [RESTModule],
  providers: [AuthService, StorageService, TraderService],
  bootstrap: [],
})
export class CoreModule {}
