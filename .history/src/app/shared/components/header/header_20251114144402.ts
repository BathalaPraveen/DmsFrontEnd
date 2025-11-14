import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {

  @Output() toggleSidebar = new EventEmitter<void>();

  now = new Date();
  username = localStorage.getItem("username") || "User";

  constructor() {
    setInterval(() => this.now = new Date(), 1000);
  }

  toggle() {
    this.toggleSidebar.emit();
  }
}
