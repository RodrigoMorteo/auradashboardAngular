import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () => import('./layouts/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    canActivate: [(route, state) => import('./core/guards/auth.guard').then(m => m.authGuard(route, state))],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard', 
        loadComponent: () => import('./features/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent) 
      },
      { 
        path: 'reports', 
        loadComponent: () => import('./features/sales-records/sales-records/sales-records.component').then(m => m.SalesRecordsComponent) 
      },
      { 
        path: 'kpi', 
        loadComponent: () => import('./features/dashboard/kpi-trends/kpi-trends.component').then(m => m.KpiTrendsComponent) 
      },
      { 
        path: 'activity', 
        loadComponent: () => import('./features/dashboard/activity-feed/activity-feed.component').then(m => m.ActivityFeedComponent) 
      },
      { 
        path: 'profile', 
        loadComponent: () => import('./features/user-profile-page/user-profile-page').then(m => m.UserProfilePageComponent) 
      },
    ],
  },
  // Wildcard route to redirect unknown paths to the dashboard (which will be guarded)
  { path: '**', redirectTo: '' },
];
