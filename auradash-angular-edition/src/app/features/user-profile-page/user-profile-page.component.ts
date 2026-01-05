import { Component } from '@angular/core';
import { UserProfileLitComponent } from '../user-profile-lit/user-profile-lit.component';

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [UserProfileLitComponent],
  template: `
    <div class="space-y-6">
      <h2 class="text-3xl font-bold tracking-tight text-slate-900">User Profile</h2>
      <p class="text-slate-500">Manage your account information and preferences.</p>
      
      <div class="max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h3 class="text-xl font-semibold mb-6">Profile Details</h3>
        
        <div class="space-y-6">
          <div class="grid grid-cols-3 gap-4 border-b border-slate-100 pb-4">
            <span class="text-sm font-medium text-slate-500">Full Name</span>
            <span class="col-span-2 text-slate-900">Admin User</span>
          </div>
          
          <div class="grid grid-cols-3 gap-4 border-b border-slate-100 pb-4">
            <span class="text-sm font-medium text-slate-500">Email Address</span>
            <span class="col-span-2 text-slate-900">admin@example.com</span>
          </div>
          
          <div class="mt-8">
            <h4 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Lit Component Integration</h4>
            <app-user-profile-lit-wrapper></app-user-profile-lit-wrapper>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserProfilePageComponent {}