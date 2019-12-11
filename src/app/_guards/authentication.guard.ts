import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isLoggedIn()) {
      return true;
    }

    // navigate to login, as if user isn't authenticated.
    this.router.navigate(['/login']);
    return false;
  }

  public isLoggedIn(): boolean {
    // Set status.
    let status = false;

    // Check if isLoggedIn is true.
    // then set status.
    if (localStorage.getItem('isLoggedIn') == "true") {
      status = true;
    }
    else {
      status = false;
    }

    // return status.
    return status;
  }
}
