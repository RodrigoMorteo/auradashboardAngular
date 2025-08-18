import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { SalesRecordsComponent } from './features/sales-records/sales-records/sales-records.component';
import { KpiTrendsComponent } from './features/dashboard/kpi-trends/kpi-trends.component';
import { ActivityFeedComponent } from './features/dashboard/activity-feed/activity-feed.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { UserProfilePageComponent } from './features/user-profile-page/user-profile-page'; // Changed import path

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'reports', component: SalesRecordsComponent },
      { path: 'kpi', component: KpiTrendsComponent },
      { path: 'activity', component: ActivityFeedComponent },
      { path: 'profile', component: UserProfilePageComponent }, // Added new route for user profile
    ],
  },
  // Wildcard route to redirect unknown paths to the dashboard (which will be guarded)
  { path: '**', redirectTo: '' },
];
