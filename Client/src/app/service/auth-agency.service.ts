import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class AuthAgencyService 
  implements CanActivate, CanDeactivate<ComponentCanDeactivate> {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  canActivate() {
    if (this.authService.isAuthenticated() && this.authService.credentials.role === 'agency') {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }

  canDeactivate(
    component: ComponentCanDeactivate
  ): boolean | Observable<boolean> {
    // if there are no pending changes, just allow deactivation; else confirm first
    return component.canDeactivate()
      ? true
      : // NOTE: this warning message will only be shown when navigating elsewhere within your angular app;
      // when navigating away from your angular app, the browser will show a generic warning message
      // see http://stackoverflow.com/a/42207299/7307355
      confirm(
        'WARNING: You have working bots. Press Cancel to go back and wait, or OK to cancel pending request.'
      );
  }
}
