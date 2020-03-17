import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoriesComponent } from './stories.component';
import { RouterModule, Routes } from '@angular/router';
import { NewStoryComponent } from './new-story/new-story.component';
import { TemplateStoryComponent } from './template-story/template-story.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';


const routes: Routes = [
  {
    path: '',
    component: StoriesComponent,
  },
  {
    path: 'new-story',
    component: NewStoryComponent,
  },
  {
    path: 'create-new-story',
    loadChildren: () => import('./create-new-story/create-new-story.module').then(m => m.CreateNewStoryModule),
  },
  {
    path: 'template-story',
    component: TemplateStoryComponent,
  }
];


@NgModule({
  declarations: [
    StoriesComponent,
    NewStoryComponent,
    TemplateStoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
  ]
})
export class StoriesModule { }
