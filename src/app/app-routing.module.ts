import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'map', pathMatch: 'full', loadChildren: () => import('./modules/map/map.module').then(m => m.MapModule)
  },
  {
    path: 'tracking', pathMatch: 'full', loadChildren: () => import('./modules/tracking/tracking.module').then(m => m.TrackingModule)
  },
  {
    path: 'admin', pathMatch: 'full', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
