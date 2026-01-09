import { Component, OnInit, inject } from '@angular/core';
import { UserProfileLitComponent } from '../user-profile-lit/user-profile-lit.component';
import { ThemeService, Theme } from '../../core/services/theme.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../../core/models/user-profile.model';

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UserProfileLitComponent],
  template: `
    <div class="space-y-6">
      <h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors">User Profile</h2>
      <p class="text-slate-500 dark:text-slate-400 transition-colors">Manage your account information and preferences.</p>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Profile Details -->
        <div class="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
          <h3 class="text-xl font-semibold mb-6 text-slate-900 dark:text-white">Profile Details</h3>
          
          <div class="space-y-6">
            <div class="grid grid-cols-3 gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
              <span class="text-sm font-medium text-slate-500 dark:text-slate-400">Full Name</span>
              <span class="col-span-2 text-slate-900 dark:text-white font-medium">{{ profile?.name || 'Loading...' }}</span>
            </div>
            
            <div class="grid grid-cols-3 gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
              <span class="text-sm font-medium text-slate-500 dark:text-slate-400">Email Address</span>
              <span class="col-span-2 text-slate-900 dark:text-white font-medium">{{ profile?.email || 'Loading...' }}</span>
            </div>
            
            <div class="mt-8">
              <h4 class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Lit Component Integration</h4>
              <app-user-profile-lit-wrapper></app-user-profile-lit-wrapper>
            </div>
          </div>
        </div>

        <!-- Appearance Settings -->
        <div class="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
          <h3 class="text-xl font-semibold mb-6 text-slate-900 dark:text-white">Appearance</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">Customize how AuraDash looks for you.</p>

          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 rounded-lg border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition cursor-pointer" 
                 (click)="setTheme('light')"
                 [ngClass]="{'ring-2 ring-slate-900 dark:ring-white': (themeService.theme$ | async) === 'light'}">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-amber-100 text-amber-600 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                </div>
                <span class="font-medium text-slate-900 dark:text-white">Light Mode</span>
              </div>
              <div *ngIf="(themeService.theme$ | async) === 'light'" class="text-slate-900 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 rounded-lg border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition cursor-pointer"
                 (click)="setTheme('dark')"
                 [ngClass]="{'ring-2 ring-slate-900 dark:ring-white': (themeService.theme$ | async) === 'dark'}">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-indigo-100 text-indigo-600 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                </div>
                <span class="font-medium text-slate-900 dark:text-white">Dark Mode</span>
              </div>
              <div *ngIf="(themeService.theme$ | async) === 'dark'" class="text-slate-900 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Communication Preferences -->
        <div class="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
          <h3 class="text-xl font-semibold mb-6 text-slate-900 dark:text-white">Communication Preferences</h3>
          
          <form [formGroup]="prefsForm" (ngSubmit)="savePrefs()" class="space-y-6">
            <div class="space-y-4">
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" formControlName="emailNotifications" class="w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900">
                <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Email Notifications</span>
              </label>
              
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" formControlName="smsNotifications" class="w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900">
                <span class="text-sm font-medium text-slate-700 dark:text-slate-300">SMS Notifications</span>
              </label>
            </div>

            <div class="space-y-3">
              <span class="block text-sm font-semibold text-slate-900 dark:text-white">Marketing Frequency</span>
              <div class="flex flex-col space-y-2">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input type="radio" formControlName="marketingFrequency" value="Daily" class="w-4 h-4 text-slate-900 border-slate-300 focus:ring-slate-900">
                  <span class="text-sm text-slate-700 dark:text-slate-300">Daily</span>
                </label>
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input type="radio" formControlName="marketingFrequency" value="Weekly" class="w-4 h-4 text-slate-900 border-slate-300 focus:ring-slate-900">
                  <span class="text-sm text-slate-700 dark:text-slate-300">Weekly</span>
                </label>
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input type="radio" formControlName="marketingFrequency" value="Monthly" class="w-4 h-4 text-slate-900 border-slate-300 focus:ring-slate-900">
                  <span class="text-sm text-slate-700 dark:text-slate-300">Monthly</span>
                </label>
              </div>
            </div>

            <div class="pt-4">
              <button type="submit" [disabled]="saving" class="w-full py-2 px-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50 transition">
                {{ saving ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
            
            <p *ngIf="saveSuccess" class="text-green-600 text-sm text-center">Changes saved successfully!</p>
          </form>
        </div>
      </div>
    </div>
  `
})
export class UserProfilePageComponent implements OnInit {
  profile: UserProfile | null = null;
  prefsForm: FormGroup;
  saving = false;
  saveSuccess = false;

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  public themeService = inject(ThemeService);

  constructor() {
    this.prefsForm = this.fb.group({
      emailNotifications: [false],
      smsNotifications: [false],
      marketingFrequency: ['Weekly', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchProfile();
  }

  fetchProfile() {
    this.http.get<UserProfile>('/api/user/profile').subscribe({
      next: (profile) => {
        this.profile = profile;
        this.prefsForm.patchValue({
          emailNotifications: profile.emailNotifications,
          smsNotifications: profile.smsNotifications,
          marketingFrequency: profile.marketingFrequency
        });
      }
    });
  }

  savePrefs() {
    if (this.prefsForm.valid) {
      this.saving = true;
      this.saveSuccess = false;
      this.http.post<UserProfile>('/api/user/profile', this.prefsForm.value).subscribe({
        next: (updated) => {
          this.profile = updated;
          this.saving = false;
          this.saveSuccess = true;
          setTimeout(() => this.saveSuccess = false, 3000);
        },
        error: () => {
          this.saving = false;
        }
      });
    }
  }

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }
}
