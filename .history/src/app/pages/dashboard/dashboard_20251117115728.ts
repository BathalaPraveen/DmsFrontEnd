import { Component, signal, OnInit, computed } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  user = signal<any>(null);
  darkMode = signal(false);

  ngOnInit() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) this.user.set(JSON.parse(savedUser));

    const theme = localStorage.getItem('theme');
    if (theme === 'dark') this.darkMode.set(true);
  }
}
