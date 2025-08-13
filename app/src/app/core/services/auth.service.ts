import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StateService } from './state.service';
import { UserProfile } from '../models/user-profile.model';

// Define the shape of the login response from our mock server
interface AuthResponse {
  token: string;
  user: {
    name: string; // This part of the response can be simplified later
    email: string;
  };
}

// Define the shape of the credentials for type safety
interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private stateService = inject(StateService);
  private platformId = inject(PLATFORM_ID);
  private readonly apiBaseUrl = 'http://localhost:3000/api';
  private readonly tokenKey = 'auradash-auth-token';

  // Use a signal to track authentication state reactively.
  // It's initialized by checking for a token in localStorage.
  isAuthenticated = signal<boolean>(this.hasAuthToken());

  private hasAuthToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(this.tokenKey);
    }
    return false;
  }

  login(credentials: Credentials): Observable<boolean> {
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/auth/login`, credentials).pipe(
      // First, handle the authentication token
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(this.tokenKey, response.token);
        }
        this.isAuthenticated.set(true);
      }),
      // After auth is successful, fetch the user profile to populate global state
      switchMap(() => this.stateService.fetchUserProfile()),
      // If both auth and profile fetch succeed, map the final result to true
      map(() => true),
      // If any step in the chain fails, catch the error and return false
      catchError(() => of(false)) // On error, return a boolean failure state.
    );
  }

  logout(): void {
    this.stateService.clearUserProfile(); // Clear global state first
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}