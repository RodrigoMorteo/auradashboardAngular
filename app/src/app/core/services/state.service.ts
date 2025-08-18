import { Injectable, signal } from '@angular/core';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // Using signals for reactive state management
  public readonly currentUser = signal<UserProfile | null>(null);

  constructor() { }

  // Method to update the user profile in the state
  // This would typically be called after a successful login or profile fetch
  setCurrentUser(user: UserProfile | null): void {
    this.currentUser.set(user);
  }
}
