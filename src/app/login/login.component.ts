import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthenticationService, AlertService, DataService, SecurityService } from "../_services";
import { User } from '../_models';
import { async } from '@angular/core/testing';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  submitted = true;
  hashedPassword: Promise<string>;
  userIdByMailAddress: any;

  checkEmailExists: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private securityService: SecurityService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.loading = false;

    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  // Get Form Controls
  get f() { return this.loginForm.controls; }

  // Login Fields
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  async onLogin() {
    // this.loading = true;

    const val = this.loginForm.value;

    // stop if form invalid
    if (this.loginForm.invalid) {
      this.alertService.error('Fill out all fields!');
      this.loading = false;
      return;
    }
    
    // this.authenticationService.getUserIdByEmail(this.email.value).subscribe(
    //   data => {
    //     if (data != null) {
    //       this.hashedPassword = this.securityService.hashPassWord(JSON.stringify(data), val.password);
    //     }
    //     this.alertService.warning('Could not get details, try again later..');
    //   },
    //   error => {
    //     this.alertService.error(`Unexpected Error: ${error.message}`);
    //   }
    // );

    // this.hashedPassword = await this.securityService.hashPassWord(this.userIdByMailAddress, this.password.value);

    const formData = new FormData();
    formData.append('Credential.MailAddress', val.email);
    formData.append('Credential.Password', val.password);
    // formData.append('Credential.Password', JSON.stringify(this.hashedPassword));

    this.authenticationService.logIn(formData).subscribe(
      (data) => {
        if (data === true) {
          this.authenticationService.storeToken(val.email);
          this.router.navigateByUrl('/');
        }
        this.alertService.warning('Email and Password, does not match, try again..');
        this.loading = false;
      },
      error => {
        this.alertService.error(`Unexpected Error: ${error.message}`);
        this.loading = false;
      }
    );
  }
}
