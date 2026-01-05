import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { PLATFORM_ID } from '@angular/core';

describe('authGuard (Server)', () => {
  const executeGuard: CanActivateFn = (...guardArgs) => 
      TestBed.runInInjectionContext(() => authGuard(...guardArgs));

  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(() => {
    mockAuthService = {
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(false)
    };
    mockRouter = {
      createUrlTree: jasmine.createSpy('createUrlTree').and.returnValue('login-url-tree')
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: PLATFORM_ID, useValue: 'server' }
      ]
    });
  });

  it('should redirect to login when not authenticated on server', () => {
    const result = executeGuard({} as any, {} as any);
    expect(mockAuthService.isAuthenticated).toHaveBeenCalled();
    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/login']);
    expect(result).toBe('login-url-tree');
  });
});
