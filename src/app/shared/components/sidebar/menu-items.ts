
export interface MenuItem {
  key: string;
  label: string;
  icon?: string; // font-awesome class or custom
  path?: string | null;
  children?: Array<string | { label: string; path?: string }>;
}

export const MENU_ITEMS: MenuItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'fa fa-home', path: '/dashboard' },
  { key: 'holiday', label: 'Holiday', icon: 'fa fa-home', path: '/holiday/holiday-list' },
  { key: "products", label: "Products", path: "/products/product-list" },
  {
    key: 'construction',
    label: 'Construction Work',
    icon: 'fa fa-building',
    children: [
      { label: 'CW Dashboard', path: '/cw/dashboard' },
      { label: 'CW Management', path: '/cw/management' },
      { label: 'A03', path: '/cw/a03' }
    ]
  },

  {
    key: 'delivery',
    label: 'Delivery Management',
    icon: 'fa fa-truck',
    children: [
      'All Deliveries',
      'Planned Deliveries',
      'Confirmation Request',
      'Confirmed Deliveries',
      'Dispatched',
      'TC Pending',
      'Completed Deliveries',
      'Close DRNs'
    ]
  },
  { key: 'employee', label: 'Employee', icon: 'fa fa-user-tie', path: '/employee' },
  { key: 'supplier', label: 'Supplier Management', icon: 'fa fa-truck-loading', children: [
    { label: 'All Suppliers', path: '/supplier' },
    { label: 'Import Suppliers', path: '/supplier/import' },
    { label: 'Add Suppliers', path: '/supplier/supplieradd' }
  ]},

  // reports example
  {
    key: 'reports',
    label: 'Reports',
    icon: 'fa fa-chart-pie',
    children: [
      'DMS Detail Report',
      'Pending Action',
      'Dispatch Delay',
      'Delivery Delay'
    ]
  },

  { key: 'userAccess', label: 'User Access', icon: 'fa fa-user-shield' },
  { key: 'workOrder', label: 'Work Order', icon: 'fa fa-tasks' }
];
