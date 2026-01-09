import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserProfilePageComponent } from './user-profile-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from '../../core/services/theme.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { UserProfile } from '../../core/models/user-profile.model';

describe('UserProfilePageComponent', () => {
  let component: UserProfilePageComponent;
  let fixture: ComponentFixture<UserProfilePageComponent>;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;

  const mockProfile: UserProfile = {
    name: 'Test User',
    email: 'test@example.com',
    emailNotifications: true,
    smsNotifications: false,
    marketingFrequency: 'Weekly'
  };

  beforeEach(async () => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    themeServiceSpy = jasmine.createSpyObj('ThemeService', ['setTheme'], {
      theme$: of('light')
    });

    await TestBed.configureTestingModule({
      imports: [UserProfilePageComponent, ReactiveFormsModule],
      providers: [
        { provide: HttpClient, useValue: httpSpy },
        { provide: ThemeService, useValue: themeServiceSpy }
      ]
    }).compileComponents();

    httpSpy.get.and.returnValue(of(mockProfile));
    fixture = TestBed.createComponent(UserProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch profile on init and populate form', () => {
    expect(httpSpy.get).toHaveBeenCalledWith('/api/user/profile');
    expect(component.profile).toEqual(mockProfile);
    expect(component.prefsForm.value).toEqual({
      emailNotifications: true,
      smsNotifications: false,
      marketingFrequency: 'Weekly'
    });
  });

  it('should save preferences on submit', fakeAsync(() => {
    const updatedPrefs = {
      emailNotifications: false,
      smsNotifications: true,
      marketingFrequency: 'Daily'
    };
    component.prefsForm.setValue(updatedPrefs);
    httpSpy.post.and.returnValue(of({ ...mockProfile, ...updatedPrefs }));

    component.savePrefs();
    expect(httpSpy.post).toHaveBeenCalledWith('/api/user/profile', updatedPrefs);
    expect(component.saving).toBeFalse();
    expect(component.saveSuccess).toBeTrue();
    
    tick(3000);
    expect(component.saveSuccess).toBeFalse();
  }));

  it('should handle save error', () => {
    httpSpy.post.and.returnValue(throwError(() => new Error('Save failed')));
    component.savePrefs();
    expect(component.saving).toBeFalse();
    expect(component.saveSuccess).toBeFalse();
  });

  it('should disable save button when saving', () => {
    component.saving = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
    expect(button.disabled).toBeTrue();
    expect(button.textContent).toContain('Saving...');
  });
});
