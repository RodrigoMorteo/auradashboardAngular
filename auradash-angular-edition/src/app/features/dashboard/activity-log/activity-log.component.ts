import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface LogMessage {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden text-slate-900">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">Live Activity Feed</h3>
        <span class="flex h-2 w-2 relative">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </div>
      
      <div class="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-200">
        <div *ngFor="let log of logs" class="flex space-x-3 items-start animate-in slide-in-from-top duration-500">
          <div [ngClass]="{
            'bg-blue-500': log.type === 'info' || !log.type,
            'bg-emerald-500': log.type === 'success',
            'bg-amber-500': log.type === 'warning',
            'bg-red-500': log.type === 'error'
          }" class="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"></div>
          
          <div class="flex-1 min-w-0">
            <p class="text-sm leading-snug"><span class="font-bold">{{ log.user }}</span> {{ log.action }}</p>
            <span class="text-[10px] font-medium text-slate-400 uppercase tracking-tight">
              {{ log.timestamp | date:'HH:mm:ss' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ActivityLogComponent implements OnInit, OnDestroy {
  logs: LogMessage[] = [];
  private intervalId: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.fetchLogs();
    if (isPlatformBrowser(this.platformId)) {
      this.startStreaming();
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fetchLogs() {
    this.http.get<{items: LogMessage[], hasMore: boolean}>('/api/widgets/activity-feed').subscribe({
      next: (res) => this.logs = res.items,
      error: () => {
        this.logs = [
          { id: '1', user: 'System', action: 'Failed to connect to activity feed', timestamp: new Date().toISOString(), type: 'error' }
        ];
      }
    });
  }

  private startStreaming() {
    this.intervalId = setInterval(() => {
      this.addRandomLog();
    }, 5000);
  }

  private addRandomLog() {
    const actions = ["updated a record", "commented on a task", "deployed to production", "joined a channel"];
    const users = ["Alice", "Bob", "Charlie", "David", "Eve"];
    const newLog: LogMessage = {
      id: Math.random().toString(),
      user: users[Math.floor(Math.random() * users.length)],
      action: actions[Math.floor(Math.random() * actions.length)],
      timestamp: new Date().toISOString(),
      type: 'info'
    };
    this.logs = [newLog, ...this.logs].slice(0, 50);
  }
}