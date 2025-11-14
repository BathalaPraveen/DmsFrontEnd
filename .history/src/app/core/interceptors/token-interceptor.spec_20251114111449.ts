import { TestBed } from '@angular/core/testing';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { tokenInterceptor } from './token-interceptor';

describe('tokenInterceptor', () => {
  let interceptor: tokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    interceptor = new tokenInterceptor();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
