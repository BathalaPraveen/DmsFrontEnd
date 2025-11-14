import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {

  @Input() activeItem: string | null = null;
  @Output() activeItemChange = new EventEmitter<string>();

  menu = [
    { icon: 'fa fa-home', label: 'Dashboard' },
    { icon: 'fa fa-building', label: 'Construction Work' },
    { icon: 'fa fa-truck', label: 'Delivery Management' },
    { icon: 'fa fa-users', label: 'Employee Management' },
    { icon: 'fa fa-plane', label: 'Holiday Management' },
    { icon: 'fa fa-list', label: 'Reports Management' },
  ];

  setActive(name: string) {
    this.activeItem = name;
    this.activeItemChange.emit(name);
  }
}
