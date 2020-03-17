import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseDemoModule, FuseHighlightModule, FuseSidebarModule } from '@fuse/components';
import { MatTableModule } from '@angular/material/table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const userManageRoutes: Routes = [
  {
    path: '',
    component: UserManagementComponent
  }
];


@NgModule({
  declarations: [
    UserManagementComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(userManageRoutes),
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatTableModule,
    NgxChartsModule,
    MatPaginatorModule,
    MatCheckboxModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseDemoModule,
    NgxDatatableModule,
    FuseHighlightModule,
    NgxPaginationModule
  ]
})
export class UserManagementModule { }
