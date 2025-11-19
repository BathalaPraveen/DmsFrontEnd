import { Component,signal , OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {

  darkMode = false;
  username = '';
  isDark = signal(true);
  time = signal('');

  ngOnInit() {
    this.username = localStorage.getItem('username') || 'User';

    setInterval(() => {
      this.time.set(new Date().toLocaleTimeString());
    }, 1000);
  }

  toggleIcon() {
    this.isDark.update(v => !v);
  }

  changeLanguage(event: any) {
    localStorage.setItem('lang', event.target.value);
  }
}
