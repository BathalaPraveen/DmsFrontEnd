import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {

  @Input() collapsed: boolean = true;

  @Input() activeItem: string | null = null;
  @Output() activeItemChange = new EventEmitter<string>();

  menu = [
    { icon: 'fa fa-home', label: 'Dashboard', route: '/dashboard' },
    { icon: 'fa fa-building', label: 'Construction Work' },
    { icon: 'fa fa-truck', label: 'Delivery Management' },
    { icon: 'fa fa-user', label: 'Employee' },
    { icon: 'fa fa-list', label: 'Reports' },
    { icon: 'fa fa-users', label: 'User Access' },
    { icon: 'fa fa-tasks', label: 'Work Order' },
  ];

  setActive(label: string) {
    this.activeItem = label;
    this.activeItemChange.emit(label);
  }
}
