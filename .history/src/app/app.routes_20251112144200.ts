import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login';
import { Signup } from './pages/auth/signup/signup.';
import { Dashboard } from './pages/dashboard/dashboard';
// import supplier/holiday components...
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: Signup },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  // supplier/holiday routes follow same pattern
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
