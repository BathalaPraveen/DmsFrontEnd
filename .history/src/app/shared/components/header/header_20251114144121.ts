import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {

  // Angular signals (super fast state)
  darkMode = signal(false);
  openDropdown = signal(false);
  username = signal('');
  time = signal('');

  router = inject(Router);

  ngOnInit() {
    // Set username
    const user = localStorage.getItem('username');
    if (user) this.username.set(user);

    // Load theme
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.darkMode.set(true);
      document.body.classList.add('dark');
    }

    // LIVE CLOCK
    setInterval(() => {
      this.time.set(new Date().toLocaleTimeString());
    }, 1000);
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

  changeLanguage(event: any) {
    localStorage.setItem('lang', event.target.value);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
