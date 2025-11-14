import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errors: any = {};
  showPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  validate() {
    const errs: any = {};
    if (!this.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(this.email)) errs.email = 'Enter a valid email';
    if (!this.password) errs.password = 'Password is required';
    else if (this.password.length < 6) errs.password = 'Password must be at least 6 chars';
    return errs;
  }

  submit() {
    this.errors = this.validate();
    if (Object.keys(this.errors).length) return;

    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: 'Login success', timer: 1200, showConfirmButton: false });
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        Swal.fire({ icon: 'error', title: err.error?.message || 'Login failed', timer: 1500, showConfirmButton: false });
      }
    });
  }
}
