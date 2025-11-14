import { Component, EventEmitter, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  imports: [DatePipe],
  styleUrls: ['./header.css']
})
export class HeaderComponent {

  @Output() toggleSidebar = new EventEmitter<void>();

  toggle() {
    this.toggleSidebar.emit();
  }

  username = localStorage.getItem('username') || 'User';
}
