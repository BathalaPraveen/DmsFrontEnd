import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NgClass } from '@angular/common';   // 👈 IMPORTANT
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgClass],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  username = '';
  password = '';
  showPassword = false;
  errors: any = {};

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}
  toast(icon: any, title: string) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
      });

      Toast.fire({
        icon: icon,
        title: title
      });
  }

  submit() {
    this.errors = {};

    if (!this.username) this.errors.username = 'Username required';
    if (!this.password) this.errors.password = 'Password required';
    if (Object.keys(this.errors).length > 0) return;

    this.auth.login(this.username, this.password).subscribe({
      next: (res: any) => {
            this.toast('success', 'Login successful!');
            setTimeout(() => {
               this.router.navigate(['/dashboard']);
            }, 800); // small delay after toast
      },
      error: (err: any) => {
           const message = err?.error?.message || 'Login failed!';
           this.toast('error', message);
      }
    });
  }
}
