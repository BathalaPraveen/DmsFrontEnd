import { tokenInterceptor } from './token-interceptor';
import { HttpRequest, HttpHandlerFn, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

describe('tokenInterceptor', () => {

  it('should add Authorization header when token exists', (done) => {
    localStorage.setItem('token', '12345');

    const req = new HttpRequest('GET', '/test');

    // 🔥 Proper HttpHandlerFn (must return Observable)
    const next: HttpHandlerFn = (request) => {
      // test header
      expect(request.headers.get('Authorization')).toBe('Bearer 12345');
      return of(null); // Important: return observable
    };

    tokenInterceptor(req, next).subscribe(() => done());
  });

  it('should NOT add Authorization header when token does not exist', (done) => {
    localStorage.removeItem('token');

    const req = new HttpRequest('GET', '/test');

    const next: HttpHandlerFn = (request) => {
      expect(request.headers.has('Authorization')).toBeFalse();
      return of(null);
    };

    tokenInterceptor(req, next).subscribe(() => done());
  });
});
