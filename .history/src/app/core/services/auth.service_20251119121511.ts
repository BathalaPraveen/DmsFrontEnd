import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'https://java.neoehs.com/auth/auth';

  constructor(private http: HttpClient, private router: Router) {}

  // LOGIN
  login(username: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res));
        })
      );
  }

  // LOGOUT
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // FETCH LOGGED USER DETAILS
  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  // CHECK LOGIN STATUS
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  // GET TOKEN
  getToken() {
    return localStorage.getItem('token');
  }
}
