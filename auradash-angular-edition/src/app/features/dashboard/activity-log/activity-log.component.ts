import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface LogMessage {
  id: number;
  message: string;
  timestamp: Date;
  type: 'info' | 'success' | 'warning' | 'error';
}

@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-slate-900">Live Activity Feed</h3>
        <span class="flex h-2 w-2 relative">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </div>
      
      <div class="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-200">
        <div *ngFor="let log of logs" class="flex space-x-3 items-start animate-in slide-in-from-top duration-500">
          <div [ngClass]="{
            'bg-blue-500': log.type === 'info',
            'bg-emerald-500': log.type === 'success',
            'bg-amber-500': log.type === 'warning',
            'bg-red-500': log.type === 'error'
          }" class="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"></div>
          
          <div class="flex-1 min-w-0">
            <p class="text-sm text-slate-800 leading-snug">{{ log.message }}</p>
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
  private nextId = 1;

  private messages = [
    "User admin logged in from 192.168.1.1",
    "New sale recorded: Aura Pro Laptop ($1299)",
    "API limit warning: 85% of monthly quota reached",
    "Database backup completed successfully",
    "New user registered: john.doe@example.com",
    "Cache cleared for production environment",
    "System update scheduled for 02:00 AM",
    "High latency detected in Tokyo region",
    "Security scan: 0 vulnerabilities found",
    "Payment processed for invoice #8842",
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    this.addInitialLogs();
    if (isPlatformBrowser(this.platformId)) {
      this.startStreaming();
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private addInitialLogs() {
    for (let i = 0; i < 5; i++) {
      this.addLog();
    }
  }

  private startStreaming() {
    this.intervalId = setInterval(() => {
      this.addLog();
    }, 3000 + Math.random() * 5000);
  }

  private addLog() {
    const message = this.messages[Math.floor(Math.random() * this.messages.length)];
    const types: ('info' | 'success' | 'warning' | 'error')[] = ['info', 'success', 'warning', 'error'];
    const type = types[Math.floor(Math.random() * types.length)];

    const newLog: LogMessage = {
      id: this.nextId++,
      message,
      timestamp: new Date(),
      type
    };

    this.logs = [newLog, ...this.logs].slice(0, 50); // Keep last 50
  }
}