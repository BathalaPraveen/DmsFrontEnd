import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth';
import { NgClass } from '@angular/common';  // ✅ Add this line

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [FormsModule],
})
export class LoginComponent {
  username = '';
  password = '';
  showPassword = false;
  errors: Record<string, string> = {};

  constructor(private auth: AuthService, private router: Router) {}

  // ✅ Validation logic
  private validate(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!this.username.trim()) {
      errors['username'] = 'User name is required';
    }

    if (!this.password.trim()) {
      errors['password'] = 'Password is required';
    } else if (this.password.length < 6) {
      errors['password'] = 'Password must be at least 6 characters';
    }

    return errors;
  }

  // ✅ Submit form
  submit() {
    this.errors = this.validate();
    if (Object.keys(this.errors).length > 0) return;

    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Login successful!',
          timer: 1200,
          showConfirmButton: false,
        });
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error?.message || 'Login failed!',
          timer: 1500,
          showConfirmButton: false,
        });
      },
    });
  }
}
