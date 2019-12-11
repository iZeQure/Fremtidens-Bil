import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  getData() {
    return JSON.parse(localStorage.getItem('isLoggedIn'));
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.clear();
    return this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/login']);
    });
    // return this.router.navigate(['/login']);
  }
}
