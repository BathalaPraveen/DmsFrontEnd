import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, NgIf, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {

  router = inject(Router);

  // Signals for UI state
  darkMode = signal(false);
  openDropdown = signal(false);
  showOffcanvas = signal(false);

  username = signal('');

  ngOnInit() {
    const user = localStorage.getItem('username');
    if (user) this.username.set(user);

    // load theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.darkMode.set(true);
      document.body.classList.add('dark');
    }
  }

  toggleTheme() {
    this.darkMode.update(v => !v);

    if (this.darkMode()) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  changeLanguage(event: any) {
    localStorage.setItem('lang', event.target.value);
  }
}
