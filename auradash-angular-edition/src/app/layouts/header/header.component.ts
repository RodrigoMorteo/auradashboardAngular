import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
      <div class="flex items-center space-x-4">
        <span class="text-slate-500 font-medium">Welcome back, Admin</span>
      </div>
      <div class="flex items-center space-x-4">
        <button class="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition">Logout</button>
      </div>
    </header>
  `
})
export class HeaderComponent {}