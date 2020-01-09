// app.module.ts

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { DigitOnlyDirective } from './_directives/digit-only.directive';
import { NavigationBarComponent } from './navigation/navigation-bar/navigation-bar.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
   declarations: [
      AppComponent,
      NavigationBarComponent,
      LoginComponent,
      DashboardComponent,
      PageNotFoundComponent,
      RegisterComponent,
      DigitOnlyDirective,
      AlertComponent
   ],
   imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule,
      FormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }