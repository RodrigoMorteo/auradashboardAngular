import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { PLATFORM_ID } from '@angular/core';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store token', () => {
    const mockResponse = { token: 'fake-token', user: { name: 'Test' } };
    const credentials = { email: 'test@test.com', password: 'password' };

    service.login(credentials).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(localStorage.getItem('auth_token')).toBe('fake-token');
      expect(service.isAuthenticated).toBeTrue();
    });

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should logout and clear storage', () => {
    localStorage.setItem('auth_token', 'fake-token');
    service.logout();
    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(service.isAuthenticated).toBeFalse();
  });

  it('should initialize with true if token exists in localStorage', () => {
    localStorage.setItem('auth_token', 'fake-token');
    
    // Inject HttpClient for manual instantiation
    const http = TestBed.inject(HttpClient); 
    const freshService = new AuthService('browser' as any, http);
    
    expect(freshService.isAuthenticated).toBeTrue();
  });
});
