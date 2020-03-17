import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { superNavigation, standardNavigation, proNavigation, agencyNavigation, resellerNavigation } from 'app/navigation/navigation';
import { AuthenticationService } from 'app/service/authentication.service';

@Component({
    selector     : 'vertical-layout-3',
    templateUrl  : './layout-3.component.html',
    styleUrls    : ['./layout-3.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VerticalLayout3Component implements OnInit, OnDestroy
{
    fuseConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _authService: AuthenticationService
    )
    {
        // Set the defaults
        if (this._authService.credentials == undefined) {
            this.navigation = standardNavigation;
        } else if (this._authService.credentials.role === 'standard') {
            this.navigation = standardNavigation;
        } else if (this._authService.credentials.role === 'super') {
            this.navigation = superNavigation;
        } else if (this._authService.credentials.role === 'pro') {
            this.navigation = proNavigation;
        } else if (this._authService.credentials.role === 'agency') {
            this.navigation = agencyNavigation;
        } else if (this._authService.credentials.role === 'reseller') {
            this.navigation = resellerNavigation;
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
