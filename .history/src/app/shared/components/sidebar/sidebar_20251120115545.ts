import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
  imports: [NgFor, NgIf, NgClass]
})
export class SidebarComponent {
  private router = inject(Router);

  // state
  collapsed = false;            // set true to test collapsed mode
  openMenu: string | null = null;
  hoverMenu: string | null = null;
  hoverPos = { top: 0, left: 0 };
  activeParent: string | null = null;
  activeItem: string | null = null;

  // menu structure (similar to your React items)
  menu = [
    { key: 'dashboard', label: 'Dashboard', icon: 'fa fa-home', path: '/dashboard' },

    {
      key: 'construction',
      label: 'Construction Work',
      icon: 'fa fa-building',
      children: [
        { label: 'CW-Dashboard', path: '/cw/dashboard' },
        { label: 'CW-Management', path: '/cw/management' },
        { label: 'A03', path: '/cw/a03' }
      ]
    },

    {
      key: 'delivery',
      label: 'Delivery Management',
      icon: 'fa fa-truck',
      children: [
        { label: 'All Deliveries', path: '/delivery/all' },
        { label: 'Planned Deliveries', path: '/delivery/planned' },
        { label: 'Confirmed Deliveries', path: '/delivery/confirmed' }
      ]
    },

    { key: 'department', label: 'Department', icon: 'fa fa-users', path: '/department' },
    { key: 'employee', label: 'Employee', icon: 'fa fa-user', path: '/employee' }
  ];

  // toggle parent (open/close)
  toggleParent(key: string, e?: MouseEvent) {
    if (this.collapsed) return; // collapsed uses hover popup
    this.openMenu = this.openMenu === key ? null : key;
    this.activeParent = key;
  }

  // click single (no children)
  onSingle(item: any) {
    this.activeItem = item.label || item.key;
    this.activeParent = null;
    if (item.path) this.router.navigate([item.path]);
  }

  // child click
  onChildClick(child: any, parentKey: string) {
    this.activeItem = child.label;
    this.activeParent = parentKey;
    if (child.path) this.router.navigate([child.path]);
  }

  // collapsed hover popup
  onMouseEnterParent(key: string, e: MouseEvent) {
    if (!this.collapsed) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    this.hoverPos = { top: rect.top, left: rect.right };
    this.hoverMenu = key;
  }
  onMouseLeaveParent() {
    if (!this.collapsed) return;
    this.hoverMenu = null;
  }

  // small helper to style active items in template
  isActive(labelOrKey: string) {
    return this.activeItem === labelOrKey || this.activeParent === labelOrKey;
  }

  // optional: toggle collapse from parent header
  setCollapsed(v: boolean) { this.collapsed = v; }

  // handle keyboard/escape closing of hover-popup
  @HostListener('document:keydown.escape', ['$event'])
  onEsc(e: KeyboardEvent) {
    this.hoverMenu = null;
  }
}
