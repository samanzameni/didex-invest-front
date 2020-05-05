import { NgModule } from '@angular/core';
import { RestModule } from './modules/rest.module';
import { AuthService, StorageService, TraderService } from './services';

@NgModule({
  declarations: [],
  imports: [RestModule],
  providers: [AuthService, StorageService, TraderService],
  bootstrap: [],
})
export class CoreModule {}
