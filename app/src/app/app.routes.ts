import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { TestBedComponent } from './features/test-bed/test-bed.component'; // Keep for testing if needed

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
      // The test-bed can be the default child route for now
      { path: '', component: TestBedComponent },
    ],
  },
  // Wildcard route to redirect unknown paths to the dashboard (which will be guarded)
  { path: '**', redirectTo: '' },
];

