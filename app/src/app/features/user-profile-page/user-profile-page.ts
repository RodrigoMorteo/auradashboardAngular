import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { UserProfile } from '../../core/models/user-profile.model';
import { StateService } from '../../core/services/state.service'; // Import StateService

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-profile-page.html',
  styleUrl: './user-profile-page.css'
})
export class UserProfilePageComponent implements OnInit {
  userProfile: any; // Declare without immediate initialization

  constructor(private authService: AuthService, private stateService: StateService) { // Inject StateService
    this.userProfile = this.stateService.currentUser; // Initialize in constructor
    console.log('UserProfilePageComponent constructor: userProfile signal initialized', this.userProfile());
  }

  ngOnInit(): void {
    console.log('UserProfilePageComponent ngOnInit: userProfile signal value', this.userProfile());
    // No need to subscribe here if using signals directly from StateService
  }

  onProfileSave(event: Event) { // Accept generic Event
    const customEvent = event as CustomEvent<any>; // Cast internally
    const updatedProfile = customEvent.detail;
    console.log('Profile save event received:', updatedProfile);
    // Here you would call a service to update the user profile
    // Example: this.authService.updateUserProfile(updatedProfile).subscribe(...);
  }
}
