import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExternalUrlRedirectorComponent } from '@widget/components';
import { WrongPageComponent } from '@feature/components/wrong-page/wrong-page.component';

const routes: Routes = [
  {
    path: 'external-redirect',
    component: ExternalUrlRedirectorComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('@feature/modules/main.module').then((m) => m.MainModule),
  },
  { path: '**', pathMatch   : 'full', component: WrongPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
