import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login..html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errors: any = {};
  showPassword = false;

  constructor(private http: HttpClient, private router: Router) {}

  submit() {
    this.errors = {};

    // basic validation
    if (!this.email) this.errors.email = 'Email is required';
    if (!this.password) this.errors.password = 'Password is required';
    if (Object.keys(this.errors).length > 0) return;

    const payload = {
      username: this.email,
      password: this.password
    };

    this.http.post('http://localhost:8085/auth/login', payload)
      .subscribe({
        next: (response: any) => {
          console.log('✅ Login Response:', response);

          if (response.status === 200) {
            // store token and roles in localStorage (or service)
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', response.username);
            localStorage.setItem('roles', JSON.stringify(response.roles));
            localStorage.setItem('permissions', JSON.stringify(response.permissions));

            alert('Login successful!');
            this.router.navigate(['/dashboard']); // change route as needed
          }
        },
        error: (error) => {
          console.error('❌ Login Failed:', error);
          this.errors.general = 'Invalid credentials or server error';
        }
      });
  }
}
