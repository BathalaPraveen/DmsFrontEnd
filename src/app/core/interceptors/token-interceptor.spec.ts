import { tokenInterceptor } from './token-interceptor';
import { HttpRequest, HttpHandlerFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

describe('tokenInterceptor', () => {

  it('should add Authorization header when token exists', (done) => {
    localStorage.setItem('token', '12345');

    const req = new HttpRequest('GET', '/test');

    const next: HttpHandlerFn = (request) => {
      expect(request.headers.get('Authorization')).toBe('Bearer 12345');
      return of(new HttpResponse({ status: 200 })); // ✅ MUST RETURN HttpResponse
    };

    tokenInterceptor(req, next).subscribe(() => done());
  });

  it('should NOT add Authorization header when token does not exist', (done) => {
    localStorage.removeItem('token');

    const req = new HttpRequest('GET', '/test');

    const next: HttpHandlerFn = (request) => {
      expect(request.headers.has('Authorization')).toBeFalse();
      return of(new HttpResponse({ status: 200 })); // ✅ FIXED
    };

    tokenInterceptor(req, next).subscribe(() => done());
  });
});
