import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthenticationGuard } from './_guards';
import { RegisterComponent } from './register/register.component';
import { DataResolverService } from './_services/data-resolver.service';

const routes: Routes = [
  /**
   * Login Route
   */
  { path: 'login', 
    component: LoginComponent 
  },
  /**
   * Dashboard Route
   */
  { path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthenticationGuard], 
    resolve: { 
      userdata: DataResolverService 
    } 
  },
  /**
   *  Register Route
   */  
  { path: 'register', 
    component: RegisterComponent,
    pathMatch: 'full'
  },
  /**
   * Empty Route, redirect to dashboard
   */
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  /**
   * Wildcard Route, if not found
   */
  { path: '**', 
    component: PageNotFoundComponent 
  }
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
