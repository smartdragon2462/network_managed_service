import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingEnginesComponent } from './ranking-engines.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: RankingEnginesComponent,
  }
];


@NgModule({
  declarations: [RankingEnginesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class RankingEnginesModule { }
