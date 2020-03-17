import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const userRoutes: Routes = [
    {
        path  : '',
        redirectTo : 'user-management'
    },
    {
        path  : 'user-management',
        loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
    },
    {
        path  : 'create-user',
        loadChildren: () => import('./create-user/create-user.module').then(m => m.CreateUserModule),
    },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
  ]
})
export class UserModule { }
