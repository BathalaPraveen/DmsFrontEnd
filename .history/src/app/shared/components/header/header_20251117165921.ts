import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {

  darkMode = false;
  username = '';
  time = '';

  ngOnInit() {
    this.username = localStorage.getItem('username') || 'User';

    setInterval(() => {
      this.time = new Date().toLocaleTimeString();
    }, 1000);
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
  }

  changeLanguage(event: any) {
    localStorage.setItem('lang', event.target.value);
  }
}
