import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '../../../core/services/theme';
import { LanguageService } from '../../../core/services/language';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';  // ✅ also add NgIf for *ngIf

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, NgIf, TranslateModule], 
  templateUrl: './header.html',
  styleUrls: ['./header.css']
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
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

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
