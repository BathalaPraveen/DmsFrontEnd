import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NgClass } from '@angular/common';   // 👈 IMPORTANT

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

  submit() {
    this.errors = {};

    if (!this.username) this.errors.username = 'Username required';
    if (!this.password) this.errors.password = 'Password required';
    if (Object.keys(this.errors).length > 0) return;

    this.auth.login(this.username, this.password).subscribe({
      next: (res: any) => {
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errors.general = 'Invalid username or password';
      }
    });
  }
}
