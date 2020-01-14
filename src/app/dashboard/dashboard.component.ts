import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { User } from '../_models';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy  {
  currentUser: User;
  currentUserSubscription: Subscription;
  accountName: string;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.accountName = JSON.parse(this.authService.getToken());
   }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }
}
