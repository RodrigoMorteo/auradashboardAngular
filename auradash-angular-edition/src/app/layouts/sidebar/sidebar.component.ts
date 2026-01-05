import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `
    <aside class="w-64 bg-slate-900 text-white flex-shrink-0 h-full">
      <div class="p-6">
        <h1 class="text-2xl font-bold tracking-tight">AuraDash</h1>
      </div>
      <nav class="mt-4 px-4 space-y-1">
        <a href="/" class="block px-4 py-2 rounded-lg bg-slate-800 text-white">Dashboard</a>
        <a href="/sales" class="block px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition">Sales Records</a>
        <a href="/profile" class="block px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition">User Profile</a>
      </nav>
    </aside>
  `
})
export class SidebarComponent {}