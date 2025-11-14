import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf, NgClass } from '@angular/common';  // ✅ IMPORTANT

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.html',
  imports: [NgFor, NgIf, NgClass],
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {

  constructor(private router: Router) {}

  activeParent: any = null;
  activeChild: any = null;

  menu = [
    { label: "Dashboard", icon: "fa fa-home", path: "/dashboard" },

    {
      label: "Construction Work",
      icon: "fa fa-building",
      open: false,
      children: [
        { label: "CW Dashboard", path: "/cw/dashboard" },
        { label: "CW Management", path: "/cw/management" },
        { label: "A03", path: "/cw/a03" }
      ]
    },

    {
      label: "Delivery Management",
      icon: "fa fa-truck",
      open: false,
      children: [
        { label: "All Deliveries", path: "/delivery/all" },
        { label: "Planned Deliveries", path: "/delivery/planned" },
        { label: "Confirmed Deliveries", path: "/delivery/confirmed" }
      ]
    },

    { label: "Department", icon: "fa fa-users", path: "/department" },
    { label: "Employee", icon: "fa fa-user", path: "/employee" }
  ];

  toggle(item: any) {
    if (!item.children) {
      this.router.navigate([item.path]);
      this.activeParent = item;
      return;
    }

    item.open = !item.open;
    this.activeParent = item;
  }

  navigateTo(child: any) {
    this.activeChild = child.label;
    this.router.navigate([child.path]);
  }
}
