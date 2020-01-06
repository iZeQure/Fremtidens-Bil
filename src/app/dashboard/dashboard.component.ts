import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  message = 'Alert: Cannot connect to server..';

  email = localStorage.getItem('token');

  isLoggedIn = false;
  userdata: any;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute
    ) 
    { }

  ngOnInit(): void {
    this.userdata = this.route.snapshot.data.userdata; // get data from resolver
    // this.userService.getLoggedInName.subscribe(name => this.userData = name);
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
