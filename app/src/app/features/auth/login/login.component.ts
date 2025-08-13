import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);

  // Pre-filled for convenience during testing, as per mock-server data
  loginForm = new FormGroup({
    email: new FormControl('test@example.com', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('password123', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    // The form value is compatible with the Credentials interface
    const credentials = this.loginForm.getRawValue();

    this.authService
      .login(credentials)
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe((success) => {
        if (success) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage.set('Invalid email or password. Please try again.');
        }
      });
  }
}