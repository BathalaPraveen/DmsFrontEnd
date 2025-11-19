import { Component,signal , OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {

  darkMode = false;
  username = '';
  isDark = signal(true);
  selectedLang = false;
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

  changeLang(event: any) {
    this.selectedLang = event.target.value;
    console.log("Selected Language:", this.selectedLang);
  }
}
