import { Component } from '@angular/core';
import { KpiTrendsComponent } from '../kpi-trends/kpi-trends.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [KpiTrendsComponent],
  template: `
    <div class="space-y-6">
      <h2 class="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
      <p class="text-slate-500">Welcome to your dashboard overview.</p>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <app-kpi-trends></app-kpi-trends>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-center italic text-slate-400">
          More metrics coming soon...
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {}
