import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const resellerRoutes: Routes = [
    {
        path        : '',
        redirectTo  : 'dashboard'
    },
    {
        path        : 'dashboard',
        loadChildren: () => import('../share/dashboard/dashboard.module').then(m => m.DashboardModule)
    }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(resellerRoutes)
  ]
})
export class ResellerModule { }
