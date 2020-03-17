import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const agencyRoute: Routes = [
  {
      path        : '',
      redirectTo  : 'dashboard'
  },
  {
      path        : 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(agencyRoute),
  ]
})
export class AgencyModule { }
