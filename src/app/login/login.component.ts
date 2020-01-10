import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { AuthenticationService, AlertService, DataService } from "../_services";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  jsonData: any;
  loading = false;
  submitted = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private dataService: DataService
  ) {
  }

  ngOnInit() {
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

  onLogin() {
    const val = this.loginForm.value;

    // stop if form invalid
    if (this.loginForm.invalid) {
      this.alertService.error('Fill out all fields!');
      return;
    }

    const formData = new FormData();
    formData.append('Credential.MailAddress', val.email);
    formData.append('Credential.Password', val.password);

    this.authenticationService.logIn(formData).subscribe(
      (data) => {
        if (data === true) {
          this.authenticationService.storeToken(val.email);
          this.router.navigateByUrl('/');
        }

        this.alertService.error('Email and Password, does not match, try again..', false);
      }
    );
  }
}
