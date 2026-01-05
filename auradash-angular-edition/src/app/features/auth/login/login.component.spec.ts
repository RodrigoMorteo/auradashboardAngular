import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when empty', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should call login and navigate on success', () => {
    const credentials = { email: 'test@example.com', password: 'password123' };
    component.loginForm.setValue(credentials);
    authServiceSpy.login.and.returnValue(of({ token: 'fake' }));

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith(credentials);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should display error on failure', () => {
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Login failed')));
    
    component.onSubmit();
    fixture.detectChanges();

    expect(component.error).toBe('Invalid credentials or server error');
    const errorEl = fixture.debugElement.query(By.css('.text-red-600'));
    expect(errorEl.nativeElement.textContent).toContain('Invalid credentials or server error');
  });

  it('should disable button when loading', () => {
    component.loading = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.disabled).toBeTrue();
    expect(button.textContent).toContain('Signing in...');
  });
});
