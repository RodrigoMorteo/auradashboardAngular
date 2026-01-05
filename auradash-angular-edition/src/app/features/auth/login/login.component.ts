import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-50">
      <div class="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-slate-200">
        <h2 class="text-3xl font-bold text-slate-900 mb-6 text-center">AuraDash Login</h2>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              formControlName="email"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition"
              placeholder="admin@example.com"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              formControlName="password"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition"
              placeholder="••••••••"
            >
          </div>

          <div *ngIf="error" class="text-red-600 text-sm">
            {{ error }}
          </div>

          <button 
            type="submit" 
            [disabled]="loginForm.invalid || loading"
            class="w-full py-3 px-4 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['admin@example.com', [Validators.required, Validators.email]],
      password: ['password123', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = null;
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.error = 'Invalid credentials or server error';
          this.loading = false;
        }
      });
    }
  }
}
