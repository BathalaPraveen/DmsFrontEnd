import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';  // ✅ Add CommonModule
import { filter } from 'rxjs/operators';

import { HeaderComponent } from './shared/components/header/header';
import { FooterComponent } from './shared/components/footer/footer';
import { SidebarComponent } from './shared/components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgIf, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  isLoginPage = false;

  constructor(private router: Router) {

    // Detect route change
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {

        const url = event.urlAfterRedirects;
        this.isLoginPage = url.startsWith('/login');
      });
  }
}
