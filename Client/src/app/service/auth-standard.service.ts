import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}


@Injectable()
export class AuthStandardService
  implements CanActivate, CanDeactivate<ComponentCanDeactivate> {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  canActivate() {
    if (this.authService.isAuthenticated() && this.authService.credentials.role === 'standard') {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }

  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    return component.canDeactivate() ? true : 
      confirm('WARNING: You have working bots. Press Cancel to go back and wait, or OK to cancel pending request.');
  }
}
