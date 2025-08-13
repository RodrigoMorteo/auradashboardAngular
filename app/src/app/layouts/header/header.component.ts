import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { StateService } from '../../core/services/state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  authService = inject(AuthService);
  stateService = inject(StateService);
  router = inject(Router);

  // Expose the current user signal to the template
  currentUser = this.stateService.currentUser;

  logout(): void {
    this.authService.logout();
    this.stateService.setCurrentUser(null);
    this.router.navigate(['/login']);
  }
}
