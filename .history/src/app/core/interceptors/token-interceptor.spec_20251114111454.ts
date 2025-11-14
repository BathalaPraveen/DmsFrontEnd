import { TestBed } from '@angular/core/testing';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenInterceptor } from './token-interceptor';

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    interceptor = new TokenInterceptor();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
