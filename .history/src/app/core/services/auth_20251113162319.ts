import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl = 'http://localhost:8085/auth'; // ✅ Fixed port and path

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) { // if backend expects 'username' not 'email'
    return this.http.post(`${this.baseUrl}/login`, { username, password })
      .pipe(tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res));
      }));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
