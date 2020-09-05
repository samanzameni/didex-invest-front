import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from '@feature/layouts';
import { NavbarComponent } from '@feature/components';
import { LocalePipeModule } from '@feature/modules/locale-pipe.module';
import { WidgetModule } from '@widget/widget.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@feature/modules/dashboard.module').then(
            (module) => module.DashboardModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [MainLayoutComponent, NavbarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LocalePipeModule,
    WidgetModule,
    FlexLayoutModule,
    //
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule,
  ],
})
export class MainModule {}
