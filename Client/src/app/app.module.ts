import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { CoreModule } from './core/core.module';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthSuperAdminGuard } from './service/auth-super-guard.service';
import { AuthStandardService } from './service/auth-standard.service';
import { AuthProService } from './service/auth-pro.service';
import { AuthAgencyService } from './service/auth-agency.service';
import { AuthResellerService } from './service/auth-reseller.service';

const appRoutes: Routes = [
    {
        path       : '',
        redirectTo : 'auth/login',
        pathMatch  : 'full'
    },
    {
        path         : 'auth',
        loadChildren : './auth/auth.module#AuthModule'
    },
    {
        path         : 'super-admin',
        loadChildren : './main/super-admin/super-admin.module#SuperAdminModule', 
        canActivate  : [AuthSuperAdminGuard]
    },
    {
        path         : 'standard',
        loadChildren : './main/standard/standard.module#StandardModule',
        canActivate  : [AuthStandardService]
    },
    {
        path        : 'pro',
        loadChildren: './main/pro/pro.module#ProModule',
        canActivate : [AuthProService]
    },
    {
        path        : 'agency',
        loadChildren: './main/agency/agency.module#AgencyModule',
        canActivate : [AuthAgencyService]
    },
    {
        path        : 'reseller',
        loadChildren: './main/reseller/reseller.module#ResellerModule',
        canActivate : [AuthResellerService]
    }

];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        CoreModule,
        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,
        MatCheckboxModule, 
        MatFormFieldModule,
        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule
    ],
    providers: [
        AuthSuperAdminGuard,
        AuthStandardService,
        AuthProService,
        AuthAgencyService,
        AuthResellerService,
    ],
    bootstrap   : [
        AppComponent
    ],
})
export class AppModule
{
}
