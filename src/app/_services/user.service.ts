import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  OK: boolean;

constructor(private router: Router) { }

  public getLoggedInName = new Subject();

  async storeData(data: unknown) {
    this.getLoggedInName.next(data);
    localStorage.setItem('isLoggedIn', JSON.stringify(data));
    return this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard']);
    });
    // return this.router.navigate(['/dashboard']); // Navigate to dashboard, if login succeeds.
  }

  setData(token: string): boolean {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('token', JSON.stringify(token));

    this.OK = true;
    return this.OK;    
  }

  getUserToken(): string {
    return JSON.parse(localStorage.getItem('token'));
  }

  getLoggedInState(): boolean {
    return JSON.parse(localStorage.getItem('isLoggedIn'));
  }

  async logout() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.clear();
    await this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/login']);
    });
    // return this.router.navigate(['/login']);
  }
}
