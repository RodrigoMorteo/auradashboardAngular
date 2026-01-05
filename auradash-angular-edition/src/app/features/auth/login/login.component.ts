import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-50">
      <div class="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-slate-200">
        <h2 class="text-3xl font-bold text-slate-900 mb-6 text-center">Login to AuraDash</h2>
        <button (click)="onLogin()" class="w-full py-3 px-4 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition">
          Simulate Login
        </button>
      </div>
    </div>
  `
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login('mock-token');
    this.router.navigate(['/']);
  }
}