import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
<<<<<<< HEAD
import { PagesComponent } from './pages.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OwlModule } from 'ngx-owl-carousel';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardModalComponent } from '../dashboard/dashboard-modal/dashboard-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { WidgetModule } from '../widget/widget.module';
=======
import {PagesComponent} from './pages.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {OwlModule} from 'ngx-owl-carousel';
import {MatDialogModule} from '@angular/material/dialog';
import {DashboardModalComponent} from '../dashboard/dashboard-modal/dashboard-modal.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {CloseModalComponent} from '../dashboard/close-modal/close-modal.component';

>>>>>>> origin/demo-hotfix-saman

@NgModule({
  declarations: [
    PagesComponent,
    NavbarComponent,
    DashboardComponent,
    DashboardModalComponent,
<<<<<<< HEAD
=======
    CloseModalComponent,
>>>>>>> origin/demo-hotfix-saman
  ],
  imports: [
    WidgetModule,
    CommonModule,
    RouterModule,
    PagesRoutingModule,
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
  ],
  exports: [
    PagesComponent,
    NavbarComponent,
    DashboardComponent,
    DashboardModalComponent,
<<<<<<< HEAD
  ],
  entryComponents: [DashboardModalComponent],
=======
    CloseModalComponent,
  ],
  entryComponents: [DashboardModalComponent, CloseModalComponent]
>>>>>>> origin/demo-hotfix-saman
})
export class PagesModule {}
