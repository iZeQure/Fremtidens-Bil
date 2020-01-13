import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DigitOnlyDirective } from '../_directives';
import { AuthenticationService, SecurityService, AlertService, DataService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  digitOnly: DigitOnlyDirective;
  registerForm: FormGroup;
  hashedPassword: string;

  apiResponse: string;

  loading = false;
  submitted = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private security: SecurityService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl(null, { validators: [Validators.required] }),
      lastName: [null, Validators.required],
      cprNumber: [null, Validators.required],
      fingerId: [null, Validators.required],
      userName: [null, Validators.required],
      phoneNumber: new FormControl(null, { validators: [Validators.required] }),
      email: [null, Validators.required],
      password: [null, Validators.required],
      repeatPassword: [null, Validators.required]
    })
  }

  get f() { return this.registerForm.controls; }

  // Get User Fields.
  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get cprNumber() { return this.registerForm.get('cprNumber'); }
  get fingerId() { return this.registerForm.get('fingerId'); }
  get userName() { return this.registerForm.get('userName'); }
  get phoneNumber() { return this.registerForm.get('phoneNumber'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get repeatPassword() { return this.registerForm.get('repeatPassword'); }

  async onRegister() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.alertService.error('Fill out all fields!');
      return;
    }

    this.hashedPassword = await this.security.hashPassWord(this.password.value, this.cprNumber.value);

    const formData = new FormData();
    formData.append('Id', this.registerForm.get('cprNumber').value);
    formData.append('UserName', this.registerForm.get('userName').value);
    formData.append('FirstName', this.registerForm.get('firstName').value);
    formData.append('LastName', this.registerForm.get('lastName').value);
    formData.append('FingerPrintId', this.registerForm.get('fingerId').value);
    formData.append('Contact.PhoneNumber', this.registerForm.get('phoneNumber').value);
    formData.append('Credential.MailAddress', this.registerForm.get('email').value);
    formData.append('Credential.Password', this.hashedPassword);

    this.authService.signUp(formData).forEach(
      (data) => {
        if (data) {
          this.alertService.success('User Created!', false);
          this.router.navigateByUrl('/login');
        } else {
          this.alertService.error('User already exists!', false);
        }
      }
    );
  }
}