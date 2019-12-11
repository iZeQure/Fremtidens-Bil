import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { ILogin } from '../_interfaces';
import { AuthenticationService } from '../_services';
import { Observable } from 'rxjs';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {  
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  message: string;
  mySubscription: any;

  model: ILogin = { emailId: "admin@cyber.dk", password: "admin123" };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {    
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = '/dashboard';
    this.authService.logout();
  }  

  get f() { return this.loginForm.controls; }

  onLogin(): Observable<Boolean> {
    console.warn('login');
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    
    if (this.f.email.value == this.model.emailId && this.f.password.value == this.model.password) {
      this.message = 'Please wait a moment...';

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', this.f.email.value);

      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate([this.returnUrl]);
      });
      // this.router.navigate([this.returnUrl]);
    }
    else {
      this.message = 'Please check your credentials';
    }

    // this.loading = true;
    // this.message = "This feature isn't available yet.";

    // setTimeout(() => {
    //   this.loading = false;
    //   this.message = '';
    // }, 2000);
  }
}
