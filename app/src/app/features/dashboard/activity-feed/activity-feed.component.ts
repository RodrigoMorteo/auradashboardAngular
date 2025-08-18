import { Component, OnInit, OnDestroy, inject, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, ActivityItem } from '../../../core/services/dashboard.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.css']
})
export class ActivityFeedComponent implements OnInit, OnDestroy {
  private dashboardService = inject(DashboardService);

  @Input() viewMode: 'full' | 'compact' = 'full';

  activityItems = signal<ActivityItem[]>([]);
  isLoading = signal(false);
  currentPage = signal(1);
  hasMore = signal(true);
  private realTimeUpdateInterval: any;

  get scrollContainerClasses() {
    return {
      'h-96': this.viewMode === 'full',
      'h-48': this.viewMode === 'compact',
    };
  }

  get itemClasses() {
    return {
      'py-2': this.viewMode === 'full',
      'py-1': this.viewMode === 'compact',
    };
  }

  get actionTextClasses() {
    return {
      'text-sm': this.viewMode === 'full',
      'text-xs': this.viewMode === 'compact',
    };
  }

  ngOnInit(): void {
    this.fetchActivityFeed();
    if (this.viewMode === 'full') {
      this.startRealTimeUpdates();
    }
  }

  ngOnDestroy(): void {
    if (this.realTimeUpdateInterval) {
      clearInterval(this.realTimeUpdateInterval);
    }
  }

  fetchActivityFeed(): void {
    if (this.viewMode === 'compact') {
      this.isLoading.set(true);
      this.dashboardService.getActivityFeed(1, 5) // Fetch only 5 items for compact view
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe(response => {
          this.activityItems.set(response.items);
          this.hasMore.set(false); // No more pages in compact view
        });
      return;
    }

    if (!this.hasMore() && this.currentPage() > 1) return; // Prevent fetching if no more data

    this.isLoading.set(true);
    this.dashboardService.getActivityFeed(this.currentPage(), 20)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe(response => {
        this.activityItems.update(items => [...items, ...response.items]);
        this.hasMore.set(response.hasMore);
        this.currentPage.update(page => page + 1);
      });
  }

  onScroll(event: Event): void {
    if (this.viewMode === 'compact') {
      return; // Do nothing on scroll in compact mode
    }
    const element = event.target as HTMLElement;
    if (element.scrollHeight - element.scrollTop === element.clientHeight && this.hasMore() && !this.isLoading()) {
      this.fetchActivityFeed();
    }
  }

  private startRealTimeUpdates(): void {
    this.realTimeUpdateInterval = setInterval(() => {
      const newItem: ActivityItem = {
        id: `act-${Date.now()}`,
        user: 'System',
        action: `Generated new activity at ${new Date().toLocaleTimeString()}`,
        timestamp: new Date().toISOString()
      };
      this.activityItems.update(items => [newItem, ...items]);
    }, 10000); // Add a new item every 10 seconds
  }
}
