import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthenticationGuard } from './_guards';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthenticationGuard], runGuardsAndResolvers: 'always' },
  { path: 'login', component: LoginComponent, runGuardsAndResolvers: 'always' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard], runGuardsAndResolvers: 'always' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
