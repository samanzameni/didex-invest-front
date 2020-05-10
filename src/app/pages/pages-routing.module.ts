import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PagesComponent} from './pages.component';
import {DashboardComponent} from '../feature/pages/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '' , component: PagesComponent , children: [
      {path: '' , component: DashboardComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
