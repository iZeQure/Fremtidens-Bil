import { Component, OnInit } from "@angular/core";
import { UserService } from './_services';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  userData: string;
  mySubscription: any;

  public session: boolean;

  constructor(private userService: UserService) {    
    this.checkSessionData();    
  } 

  ngOnInit() {
    this.userData = localStorage.getItem('token');
  }

  public checkSessionData() {
    this.session = this.userService.getData();
  }
}
