import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';
import { SecurityService } from './security.service';
import { User } from '../_models';

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private testvalue: any;

  private getPassword: FormDataEntryValue;
  private getId: FormDataEntryValue;

  constructor(private dataService: DataService, private securityService: SecurityService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.getToken()));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  public get currentUserTokenValue(): User {
    return this.currentUserSubject.value;
  }

  storeToken(token: string): string {
    localStorage.setItem('token', JSON.stringify(token));    
    return this.getToken();
  }

  removeToken() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.currentUserSubject.next(null);
  }

  logIn(userData: FormData): Observable<any> {
    return this.dataService.postLoginUser(userData);
  }

  logOut() {
    this.removeToken();
  }

  signUp(userData: FormData): Observable<any> {
    return this.dataService.postCreateUser(userData);
  }

  getUserIdByEmail(mailAddress: string): Observable<any> {
    return this.dataService.getUserIdByMailAddress(mailAddress);
  }
}
