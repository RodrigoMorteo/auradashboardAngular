import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'auradash-jwt';
  private readonly API_URL = 'http://localhost:3001/api'; // Mock server URL
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);
  private stateService = inject(StateService);

  constructor() {
    if (isPlatformBrowser(this.platformId) && this.isAuthenticated()) {
      // If a token exists, try to fetch user profile on app load
      this.fetchUserProfile().subscribe();
    }
  }

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          this.storeToken(response.token);
        }
      }),
      catchError(error => {
        console.error('Login failed', error);
        return of(null); // Return a safe value
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.JWT_TOKEN);
    }
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      // Basic check: In a real app, you'd also validate the token's expiration
      return !!token;
    }
    return false; // Not authenticated on the server
  }

  private storeToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.JWT_TOKEN, token);
    }
  }

  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.JWT_TOKEN);
    }
    return null;
  }

  private fetchUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/user/profile`).pipe(
      tap(userProfile => {
        this.stateService.setCurrentUser(userProfile);
      }),
      catchError(error => {
        console.error('Failed to fetch user profile', error);
        return of(null);
      })
    );
  }
}
