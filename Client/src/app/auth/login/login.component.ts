import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from 'app/service/authentication.service';
import { Router } from '@angular/router';
import { standardNavigation, superNavigation, proNavigation, agencyNavigation, resellerNavigation } from 'app/navigation/navigation';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class LoginComponent implements OnInit {
  public userRole: string;
  loginForm: FormGroup;
  isAuthenticated: boolean;
  isUnAuthorized: boolean;
  isRepeated: boolean;
  navigation: any;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private _fuseNavigationService: FuseNavigationService,
  ) {
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
  }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.authService.login(this.loginForm.value)
      .subscribe(credentials => {
        if (credentials['result'] == false) {
          this.isUnAuthorized = true;
        } else {
          this.authService.setCredentials(credentials, this.loginForm.value.remember).then(() => {
            this.isAuthenticated = true;
            this.isUnAuthorized = false;
            this.userRole = credentials.role;
            if (this.userRole === 'standard') {
              this.navigation = standardNavigation;
              this._fuseNavigationService.register('main', this.navigation);
              this.router.navigate(['/standard'], { replaceUrl: true });
            } else if (this.userRole === 'super') {
              this.navigation = superNavigation;
              this._fuseNavigationService.register('main', this.navigation);
              this.router.navigate(['/super-admin'], { replaceUrl: true });
            } else if (this.userRole === 'pro') {
              this.navigation = proNavigation;
              this._fuseNavigationService.register('main', this.navigation);
              this.router.navigate(['/pro'], { replaceUrl: true });
            } else if (this.userRole === 'agency') {
              this.navigation = agencyNavigation;
              this._fuseNavigationService.register('main', this.navigation);
              this.router.navigate(['/agency'], { replaceUrl: true });
            } else if (this.userRole === 'reseller') {
              this.navigation = resellerNavigation;
              this._fuseNavigationService.register('main', this.navigation);
              this.router.navigate(['/reseller'], {replaceUrl: true})
            }
          });
        }
      })
  }

}
