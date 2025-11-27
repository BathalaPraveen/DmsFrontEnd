import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login';
import { Signup } from './pages/auth/signup/signup';
import { Dashboard } from './pages/dashboard/dashboard';
import { Employee } from './pages/employee/employee';
import { AuthGuard } from './core/guards/auth-guard';
import { HolidayListComponent } from './pages/holiday/holiday-list/holiday-list.component';
import { HolidayAddComponent } from './pages/holiday/holiday-add/holiday-add.component';
import { HolidayEditComponent } from './pages/holiday/holiday-edit/holiday-edit';
import { ProductListComponent } from './pages/products/product-list/product-list';
import { ProductAddComponent } from './pages/products/product-add/product-add';
import { ProductEditComponent } from './pages/products/product-edit/product-edit';

import { DepartmentComponent } from './pages/department/department';
import { AddDepartmentComponent } from './pages/add-department/add-department';
import { EditDepartmentComponent } from './pages/edit-department/edit-department';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: Signup },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  // HOLIDAY ROUTES
  { path: 'holiday',
      children: [
        { path: 'holiday-list', component: HolidayListComponent, canActivate: [AuthGuard] },
        { path: 'add', component: HolidayAddComponent, canActivate: [AuthGuard] },
        { path: 'holiday-edit/:id', component: HolidayEditComponent, canActivate: [AuthGuard] }
      ]
  },
  { path: 'products/product-list', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'products/product-add', component: ProductAddComponent },
  { path: 'products/product-edit/:id', component: ProductEditComponent },
  { path: '', redirectTo: '/products/product-list', pathMatch: 'full' },
   { path: 'employee', component: Employee, canActivate: [AuthGuard] },
   { path: 'department/list', component: DepartmentComponent, canActivate: [AuthGuard] },
   { path: 'department/add', component: AddDepartmentComponent, canActivate: [AuthGuard]},
   { path: 'department/edit/:id', component: EditDepartmentComponent, canActivate: [AuthGuard] },
   { path: 'department/view/:id', loadComponent: () => import('./pages/view-department/view-department').then(m => m.ViewDepartmentComponent)},
   { path: '**', redirectTo: 'login' }


];
