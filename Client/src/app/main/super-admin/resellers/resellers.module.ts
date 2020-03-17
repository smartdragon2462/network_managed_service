import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResellersComponent } from './resellers.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ResellersComponent,
  }
];


@NgModule({
  declarations: [ResellersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ResellersModule { }
