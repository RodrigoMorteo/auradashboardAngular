import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { KpiTrendsComponent } from '../kpi-trends/kpi-trends.component';
import { ActivityFeedComponent } from '../activity-feed/activity-feed.component';
import { SalesRecordsComponent } from '../../sales-records/sales-records/sales-records.component';
import { CommonModule } from '@angular/common'; // Needed for ngSwitch

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, // For ngSwitch
    DragDropModule,
    KpiTrendsComponent,
    ActivityFeedComponent,
    SalesRecordsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  dashboardWidgets: string[] = ['kpi', 'activity', 'sales'];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dashboardWidgets, event.previousIndex, event.currentIndex);
  }
}
