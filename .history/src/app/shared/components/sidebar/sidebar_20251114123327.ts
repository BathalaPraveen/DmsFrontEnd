// src/app/shared/components/sidebar/sidebar.ts
import { Component, EventEmitter, Input, Output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MENU_ITEMS, MenuItem } from './menu-items';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  // parent can control collapsed state via binding
  @Input() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  // active item & active parent notify parent if needed
  @Input() activeItem: string | null = null;
  @Output() activeChange = new EventEmitter<string | null>();
  @Output() activeChange = new EventEmitter<string | null>();


  // internal state
  openMenu = signal<string | null>(null); // which parent is expanded
  hoverMenu = signal<string | null>(null); // hovered item in collapsed mode
  hoverPos = signal<{ top: number; left: number }>({ top: 0, left: 0 });
  activeParent = signal<string | null>(null);

  menuItems: MenuItem[] = MENU_ITEMS;

  router = inject(Router);

  // toggle collapsed state (call from header)
  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
    // when expanding, clear hover popup
    if (!this.collapsed) this.hoverMenu.set(null);
  }

  // parent click expand/collapse
  onParentClick(key: string) {
    if (this.collapsed) return; // do nothing when collapsed (hover popup will handle)
    this.openMenu.update(prev => (prev === key ? null : key));
    this.activeParent.set(key);
  }

  onMouseEnterParent(key: string, event: MouseEvent) {
    if (!this.collapsed) return;
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.hoverPos.set({ top: rect.top, left: rect.right });
    this.hoverMenu.set(key);
  }

  onMouseLeaveParent() {
    if (!this.collapsed) return;
    this.hoverMenu.set(null);
  }

  onChildClick(label: string | { label: string; path?: string }, parentKey?: string) {
    const name = typeof label === 'string' ? label : label.label;
    const path = typeof label === 'string' ? undefined : label.path;
    this.activeItem = name;
    this.activeChange.emit(this.activeItem);
    this.activeParent.set(parentKey ?? null);

    if (path) this.router.navigate([path]);
  }

  onSingleClick(item: MenuItem) {
    this.activeItem = item.label;
    this.activeChange.emit(this.activeItem);
    this.activeParent.set(null);
    if (item.path) this.router.navigate([item.path]);
  }

  // helper used in template for styling
  isActiveItem(name: string) {
    return this.activeItem === name;
  }
}
