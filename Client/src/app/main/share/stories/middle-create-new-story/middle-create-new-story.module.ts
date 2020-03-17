import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiddleCreateNewStoryComponent } from './middle-create-new-story.component';
import { Routes, RouterModule } from '@angular/router';
import { CreateStoryModule } from '../create-story/create-story.module';

const routes: Routes = [
  {
    path: '',
    component: MiddleCreateNewStoryComponent,
  },
];

@NgModule({
  declarations: [
    MiddleCreateNewStoryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CreateStoryModule,
  ]
})
export class MiddleCreateNewStoryModule { }
