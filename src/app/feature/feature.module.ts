import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetModule } from '@widget/widget.module';

import { NavbarComponent } from '../feature/components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from '../feature/pages/dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OwlModule } from 'ngx-owl-carousel';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardModalComponent } from '../feature/components/dashboard-modal/dashboard-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { CloseModalComponent } from '../feature/components/close-modal/close-modal.component';
import { MatSnackBarModule } from '@angular/material';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent,
    DashboardModalComponent,
    CloseModalComponent,
  ],
  imports: [
    WidgetModule,
    CoreModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    OwlModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDividerModule,
    MatSnackBarModule,
  ],
  exports: [
    NavbarComponent,
    DashboardComponent,
    DashboardModalComponent,
  ],
  entryComponents: [DashboardModalComponent, CloseModalComponent],
})
export class FeatureModule {}
