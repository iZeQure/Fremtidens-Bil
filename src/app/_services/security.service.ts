import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private saltedString: string;
  private hashedPassword: Promise<string>;

  constructor() { }

  hashPassWord(password: string, salt: string): Promise<string> {
    this.saltedString = salt + password;
    console.warn(`Salted String: ${this.saltedString}`);

    this.hashedPassword = bcrypt.hash(this.saltedString, 10);

    this.hashedPassword.then(res => {
      console.warn(`Hashed Password: ${JSON.stringify(res)}`);
    });

    return this.hashedPassword;
  }
}
