import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { KpiTrendsComponent } from '../kpi-trends/kpi-trends.component';
import { ActivityLogComponent } from '../activity-log/activity-log.component';
import { SalesRecordsComponent } from '../../sales-records/sales-records/sales-records.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DragDropModule, KpiTrendsComponent, ActivityLogComponent, SalesRecordsComponent, RouterModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
          <p class="text-slate-500">Welcome to your workspace. Drag widgets to reorder.</p>
        </div>
      </div>

      <div cdkDropList cdkDropListOrientation="mixed" (cdkDropListDropped)="drop($event)" class="grid grid-cols-1 xl:grid-cols-2 gap-6 min-h-[500px]">
        @for (widget of widgets; track widget) {
          <div cdkDrag class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group relative">
            <!-- Drag Handle Overlay -->
            <div cdkDragHandle class="absolute top-4 right-4 z-10 p-2 cursor-move opacity-0 group-hover:opacity-100 bg-slate-100 rounded-lg transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>
            </div>

            <div class="flex-1">
              @if (widget === 'trends') {
                <div class="h-full flex flex-col">
                  <app-kpi-trends class="flex-1"></app-kpi-trends>
                </div>
              } @else if (widget === 'log') {
                <div class="h-full flex flex-col">
                  <app-activity-log class="flex-1"></app-activity-log>
                </div>
              } @else if (widget === 'sales') {
                <div class="h-full flex flex-col relative">
                  <div class="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10 group/overlay">
                    <a routerLink="/sales" class="px-6 py-2 bg-slate-900 text-white rounded-lg font-semibold transform translate-y-4 group-hover/overlay:translate-y-0 transition-transform">View Full Sales Table</a>
                  </div>
                  <app-sales-records class="flex-1 opacity-50 pointer-events-none"></app-sales-records>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class DashboardComponent {
  widgets = ['trends', 'log', 'sales'];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.widgets, event.previousIndex, event.currentIndex);
  }
}