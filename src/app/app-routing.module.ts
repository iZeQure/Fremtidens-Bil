import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthGuard } from './_guards';

const routes: Routes = [
  /**
   * Empty Route, redirect to dashboard
   */
  { path: '', component: DashboardComponent, canActivate: [ AuthGuard ] },

  /**
   * Login Route
   */
  { path: 'login', component: LoginComponent },

  /**
   *  Register Route
   */  
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },

  /**
   * Otherwise redirect to dashboard
   */
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() { }
 }
