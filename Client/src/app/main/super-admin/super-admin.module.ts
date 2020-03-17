import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const superRoutes: Routes = [
    {
        path  : '',
        redirectTo : 'users'
    },
    {
        path  : 'users',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    },
    {
        path  : 'resellers',
        loadChildren: () => import('./resellers/resellers.module').then(m => m.ResellersModule),
    },
    {
        path  : 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
    },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(superRoutes),
  ]
})
export class SuperAdminModule { }
