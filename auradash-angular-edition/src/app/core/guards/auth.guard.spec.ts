import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

describe('authGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      isAuthenticated$: of(false)
    });
    routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
  });

  it('should redirect to /login if not authenticated', (done) => {
    const mockUrlTree = {} as UrlTree;
    routerSpy.createUrlTree.and.returnValue(mockUrlTree);

    // Re-create the spy with isAuthenticated$ = of(false) - already done in beforeEach
    
    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
    
    if (result instanceof Promise) {
        result.then(val => {
            expect(val).toBe(mockUrlTree);
            expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/login']);
            done();
        });
    } else if (result && 'subscribe' in (result as any)) {
        (result as any).subscribe((val: any) => {
            expect(val).toBe(mockUrlTree);
            expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/login']);
            done();
        });
    }
  });

  it('should return true if authenticated', (done) => {
    // Override the spy property
    Object.defineProperty(authServiceSpy, 'isAuthenticated$', { get: () => of(true) });

    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    if (result && 'subscribe' in (result as any)) {
        (result as any).subscribe((val: any) => {
            expect(val).toBeTrue();
            done();
        });
    }
  });
});
