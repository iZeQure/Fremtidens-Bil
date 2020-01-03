import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

import { AuthenticationService, UserService } from '../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  message = 'Alert: Cannot connect to server..';

  email = localStorage.getItem('token');

  isLoggedIn = false;
  public userData: any;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getLoggedInName.subscribe(name => this.userData = name);
    // this.emailId = localStorage.getItem('token');
  }

  onLogout() {
    this.userService.logout();
  }

  // onLogout() {
  //   console.warn('Logout');
  //   this.authService.logout();
  //   this.router.navigate(['/login']);
  // }
}
