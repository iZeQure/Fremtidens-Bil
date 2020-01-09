import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DigitOnlyDirective } from '../_directives';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  digitOnly: DigitOnlyDirective;
  registerForm: FormGroup;

  loading = false;
  submitted = true;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl(null, { validators: [ Validators.required ]}),
      lastName: [ null, Validators.required ],
      cprNumber: [ null, Validators.required ],
      fingerId: [ null, Validators.required ],
      userName: [ null, Validators.required ],
      phoneNumber: new FormControl( null, { validators: [ Validators.required ]}),
      email: [ null, Validators.required ],
      password: [ null, Validators.required ],
      repeatPassword: [ null, Validators.required ]})
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

  onRegister() {
    this.submitted = true;

    if (this.registerForm.invalid) return;

    const formData = new FormData();
    formData.append('Id', this.registerForm.get('cprNumber').value);
    formData.append('UserName', this.registerForm.get('userName').value);
    formData.append('FirstName', this.registerForm.get('firstName').value);
    formData.append('LastName', this.registerForm.get('lastName').value);
    formData.append('FingerPrintId', this.registerForm.get('fingerId').value);
    formData.append('Contact.PhoneNumber', this.registerForm.get('phoneNumber').value);
    formData.append('Credential.MailAddress', this.registerForm.get('email').value);
    formData.append('Credential.Password', this.registerForm.get('password').value);

    this.dataService.postCreateUser(formData)
        .subscribe(
          (val) => {
            console.warn(`Val: ${val}`);
          },
          error => {
            console.error(`Error: ${error}`);
          },
          () => {
            console.log(`Register Observable Finished!`);
          }
        );
  }
}