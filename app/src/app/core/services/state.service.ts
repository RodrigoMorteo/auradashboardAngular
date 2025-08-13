import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private http = inject(HttpClient);
  private readonly apiBaseUrl = 'http://localhost:3000/api';

  // Internal writable signal to hold the state
  private readonly userProfile = signal<UserProfile | null>(null);

  // Public readonly signal to expose the state safely
  readonly currentUser = this.userProfile.asReadonly();

  fetchUserProfile(): Observable<UserProfile> {
    return this.http
      .get<UserProfile>(`${this.apiBaseUrl}/user/profile`)
      .pipe(
        tap((profile) => this.userProfile.set(profile))
      );
  }

  clearUserProfile(): void {
    this.userProfile.set(null);
  }
}