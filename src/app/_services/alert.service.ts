import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Displays any kind of alert message for the client users.
 */
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  /**
   * Success Message.
   * @param message 
   * @param keepAfterNavigationChange 
   */
  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message } );
  }

  /**
   * Danger Message.
   * @param message 
   * @param keepAfterNavigationChange 
   */
  danger(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next( { type: 'danger', text: message } );
  }

  /**
   * Warning Message.
   * @param message 
   * @param keepAfterNavigationChange 
   */
  warning(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next( { type: 'warning', text: message } );
  }

  /**
   * Information Message.
   * @param message 
   * @param keepAfterNavigationChange 
   */
  info(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next( { type: 'info', text: message } );
  }

  /**
   * Error or Critical Message.
   * @param message 
   * @param keepAfterNavigationChange 
   */
  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message } );
  }

  /**
   * Used by the alert component, 
   * no need to use this method,
   * causes uneccesary problems.
   * @returns Observable<any>
   */
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
