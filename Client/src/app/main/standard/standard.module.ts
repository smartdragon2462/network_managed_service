import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const standardRoutes: Routes = [
    {
        path        : '',
        redirectTo  : 'dashboard'
    },
    {
        path        : 'dashboard',
        loadChildren: () => import('../share/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path        : 'smart-scheduler',
        loadChildren: () => import('../share/smart-scheduler/smart-scheduler.module').then(m => m.SmartSchedulerModule)
    },
    {
        path        : 'stories',
        loadChildren: () => import('../share/stories/stories.module').then(m => m.StoriesModule)
    },
    {
        path        : 'artificial',
        loadChildren: () => import('../share/artificial/artificial.module').then(m => m.ArtificialModule)
    },
    {
        path        : 'ranking-engines',
        loadChildren: () => import('../share/ranking-engines/ranking-engines.module').then(m => m.RankingEnginesModule)
    },
    {
        path        : 'statistics',
        loadChildren: () => import('../share/statistics/statistics.module').then(m => m.StatisticsModule)
    },
    {
        path        : 'accounts',
        loadChildren: () => import('../share/accounts/accounts.module').then(m => m.AccountsModule)
    },
    {
        path        : 'settings',
        loadChildren: () => import('../share/settings/settings.module').then(m => m.SettingsModule)
    },
    {
        path        : 'help',
        loadChildren: () => import('../share/help/help.module').then(m => m.HelpModule)
    }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(standardRoutes),
  ]
})
export class StandardModule { }
