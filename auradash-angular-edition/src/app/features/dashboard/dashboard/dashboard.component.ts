import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="space-y-6">
      <h2 class="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
      <p class="text-slate-500">Welcome to your dashboard overview.</p>
    </div>
  `
})
export class DashboardComponent {}