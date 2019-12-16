import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IRegister } from '../_interfaces';
import { DigitOnlyDirective } from '../_directives';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  digitOnly: DigitOnlyDirective;

  registerFormTitle: any[];
  registerUserBtn: any;
  inputElement: any;
  returnUrl: string;
  alertMessage: string;
  submitted: boolean;
  loading: boolean
  error: boolean;

  // Form Controller
  registerForm: FormGroup;
  model: IRegister = { 
    firstName: 'a',
    lastName: 'b',
    cprNumber: '1234567890',
    fingerId: 1,
    userName: 'test',
    phoneNumber: '12345678',
    email: 'test@cyber.dk',
    password: 'test'
  };

  constructor(
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.error = false;
    this.registerFormTitle = ['Bruger Information', 'Log Ind Information'];
    this.registerUserBtn = 'Registrer Bruger';
    this.returnUrl = '/dashboard';

    this.registerForm = this.formBuilder.group({
      firstName: new FormControl(
        null, {
          validators: [
            Validators.required
          ]
        }        
      ),
      lastName: [
        null, 
        Validators.required
      ],
      cprNumber: [
        null, 
        Validators.required
      ],
      fingerId: [
        null,
        Validators.required
      ],
      userName: [
        null, 
        Validators.required
      ],
      phoneNumber: new FormControl(
        null, {
          validators: [
            Validators.required
          ]
        } 
      ),
      email: [
        null, 
        Validators.required
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
      ],
      password: [
        null, 
        Validators.required
      ],
      repeatPassword: [
        null, 
        Validators.required
      ]
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

  onRegister(): Observable<Boolean> {
    console.info('register user, wait');
    this.error = true;
    this.submitted = true;
    this.loading = true;

    if(this.registerForm.invalid) {
      console.info('register user, invalid');
      this.alertMessage = 'Form is invalid, check information';
      this.loading = false;
      return;
    }

    console.info('register user, valid');
    if 
    (
      this.f.firstName.value == this.model.firstName &&
      this.f.lastName.value == this.model.lastName &&
      this.f.cprNumber.value == this.model.cprNumber &&
      this.f.fingerId.value == this.model.fingerId &&
      this.f.userName.value == this.model.userName &&
      this.f.phoneNumber.value == this.model.phoneNumber
    ) {
      if (this.f.email.value == this.model.email) {
        console.warn('true');
        this.loading = true;
        this.alertMessage = "Wait a moment, we're redirecting you!"
        this.delay(1500);
      }
    }
    console.warn('done');
    this.delay(300);
    this.loading = false;
    this.error = false;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}