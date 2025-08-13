import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'auradash-jwt';
  private readonly API_URL = 'http://localhost:3001/api'; // Mock server URL

  constructor(private http: HttpClient) { }

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap(response => this.storeToken(response.token)),
      catchError(error => {
        console.error('Login failed', error);
        return of(null); // Return a safe value
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Basic check: In a real app, you'd also validate the token's expiration
    return !!token;
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }
}
