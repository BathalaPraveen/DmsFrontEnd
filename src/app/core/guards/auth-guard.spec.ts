import { AuthGuard } from './auth-guard';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard (Standalone)', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should allow access if token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('dummy-token');

    const result = AuthGuard({} as any, {} as any); // <-- Guard is a function

    expect(result).toBeTrue();
  });

  it('should redirect to /login if no token', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const result = AuthGuard({} as any, {} as any);

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
