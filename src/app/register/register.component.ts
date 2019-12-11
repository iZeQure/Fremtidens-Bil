import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFormTitle: any[];
  registerUserBtn: any;
  returnUrl: string;
  submitted: boolean;
  error: boolean;
  alertMessage: string;

  // Form Controller
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {
    this.error = false;
    this.registerFormTitle = ['Bruger Information', 'Log Ind Information'];
    this.registerUserBtn = 'Registrer Bruger';
    this.returnUrl = '/dashboard';

    // this.registerForm = new FormGroup({
    //   firstName: new FormControl(),
    //   lastName: new FormControl(),
    //   cprNumber: new FormControl(),
    //   fingerId: new FormControl(),
    //   userName: new FormControl(),
    //   phoneNumber: new FormControl(),
    //   email: new FormControl(),
    //   password: new FormControl(),
    //   repeatPassword: new FormControl()
    // });

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cprNumber: ['', Validators.required],
      fingerId: ['', Validators.required],
      userName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    })
  }

  get f() { return this.registerForm.controls; }

  onRegister(): Observable<Boolean> {
    console.info('register user');
    this.submitted = true;

    if(this.registerForm.invalid) {
      return;
    }
  }

  public test() {
    this.error = true;
    this.alertMessage = 'test';
  }

}
