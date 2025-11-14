import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {

  username: string | null = null; // <-- Component property

  constructor(private router: Router) {}

  ngOnInit() {
    this.username = localStorage.getItem('username');  // <-- Load on component init
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    localStorage.removeItem('permissions');

    this.router.navigate(['/login']);
  }
}
