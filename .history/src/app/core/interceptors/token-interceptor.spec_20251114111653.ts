import { tokenInterceptor } from './token-interceptor';
import { HttpRequest } from '@angular/common/http';

describe('tokenInterceptor', () => {
  it('should be created', () => {
    expect(tokenInterceptor).toBeTruthy();
  });

  it('should add Authorization header when token exists', () => {
    localStorage.setItem('token', '12345');

    const req = new HttpRequest('GET', '/test');
    const next = (request: any) => {
      expect(request.headers.get('Authorization')).toBe('Bearer 12345');
    };

    tokenInterceptor(req, next);
  });

  it('should not add Authorization header when no token', () => {
    localStorage.removeItem('token');

    const req = new HttpRequest('GET', '/test');
    const next = (request: any) => {
      expect(request.headers.has('Authorization')).toBeFalse();
    };

    tokenInterceptor(req, next);
  });
});
