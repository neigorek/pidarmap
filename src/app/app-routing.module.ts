import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'map', pathMatch: 'full', loadChildren: () => import('./modules/map/map.module').then(m => m.MapModule), canActivate: [AuthGuardService]
  },
  {
    path: 'tracking', pathMatch: 'full', loadChildren: () => import('./modules/tracking/tracking.module').then(m => m.TrackingModule), canActivate: [AuthGuardService]
  },
  {
    path: 'admin', pathMatch: 'full', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuardService]
  },
  {
    path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
