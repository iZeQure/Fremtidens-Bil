// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthenticationGuard } from './_guards';
import { RegisterComponent } from './register/register.component';
import { DigitOnlyDirective } from './_directives/digit-only.directive';
import { NavigationBarComponent } from './navigation/navigation-bar/navigation-bar.component';

@NgModule({
   declarations: [
      AppComponent,
      NavigationBarComponent,
      LoginComponent,
      DashboardComponent,
      PageNotFoundComponent,
      RegisterComponent,
      DigitOnlyDirective
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
   ],
   providers: [
      AuthenticationGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }