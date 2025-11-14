import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '../../../core/servicestheme';
import { LanguageService } from '../../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  darkMode = false;
  showProfile = false;
  openDropdown = false;
  showOffcanvas = false;
  user: any;

  @ViewChild('dropdownRef') dropdownRef!: ElementRef;

  constructor(
    private themeService: ThemeService,
    private langService: LanguageService,
    public translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.themeService.darkMode$.subscribe(mode => this.darkMode = mode);
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  handleLanguageChange(event: any) {
    this.langService.changeLanguage(event.target.value);
  }

  handleLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  toggleDropdown() {
    this.openDropdown = !this.openDropdown;
  }

  toggleOffcanvas() {
    this.showOffcanvas = !this.showOffcanvas;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (this.dropdownRef && !this.dropdownRef.nativeElement.contains(event.target)) {
      this.openDropdown = false;
    }
  }
}
