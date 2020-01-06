import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // user = {
  //   name: 'Tobias',
  //   age: 21,
  //   profession: 'Test'
  // }

  user: any;
  constructor(private userService: UserService) { 
    this.user = this.userService.getUserToken();
  }

  getData(): Observable<any> {
    return new Observable((o) => {
      setTimeout(() => {
        o.next(this.user);
      }, 1000)
    })
  }
}
