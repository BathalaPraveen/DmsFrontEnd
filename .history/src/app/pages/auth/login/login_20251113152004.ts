import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth'; // adjust if needed

@Component({
  selector: 'app-login',
  standalone: true, // ✅ mark it as standalone component
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [FormsModule], // ✅ imports required for [(ngModel)]
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;
  errors: Record<string, string> = {};

  constructor(private auth: AuthService, private router: Router) {}

  // ✅ Validation logic
  private validate(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!this.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.email = 'Enter a valid email address';
    }

    if (!this.password.trim()) {
      errors.password = 'Password is required';
    } else if (this.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  }

  // ✅ Submit form
  submit() {
    this.errors = this.validate();
    if (Object.keys(this.errors).length > 0) return;

    this.auth.login(this.email, this.password).subscribe({
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
