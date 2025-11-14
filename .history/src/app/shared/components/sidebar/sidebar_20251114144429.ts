import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {

  @Input() collapsed: boolean = false;
  @Input() activeItem: string | null = null;
  @Output() activeItemChange = new EventEmitter<string>();

  menu = [
    { icon: 'fa fa-home', label: 'Dashboard' },
    { icon: 'fa fa-building', label: 'Construction Work' },
    { icon: 'fa fa-truck', label: 'Delivery Management' },
    { icon: 'fa fa-user', label: 'Employee Management' },
    { icon: 'fa fa-list', label: 'Reports' }
  ];

  select(label: string) {
    this.activeItem = label;
    this.activeItemChange.emit(label);
  }
}
