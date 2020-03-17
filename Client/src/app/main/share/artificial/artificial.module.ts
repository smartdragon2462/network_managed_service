import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtificialComponent } from './artificial.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ArtificialComponent,
  }
];

@NgModule({
  declarations: [ArtificialComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ArtificialModule { }
