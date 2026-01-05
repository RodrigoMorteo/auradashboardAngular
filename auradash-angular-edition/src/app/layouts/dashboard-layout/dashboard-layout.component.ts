import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, RouterOutlet],
  template: `
    <div class="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <app-sidebar></app-sidebar>
      <div class="flex-1 flex flex-col min-w-0">
        <app-header></app-header>
        <main class="flex-1 overflow-y-auto p-8">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class DashboardLayoutComponent {}