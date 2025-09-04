import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent) },
      { path: '2fa', loadComponent: () => import('./pages/auth/two-fa/two-fa.component').then(m => m.TwoFaComponent) },
      { path: '', pathMatch: 'full', redirectTo: 'login' },
    ],
  },
  {
    path: '',
    component: AdminLayoutComponent,
    // Removido canActivate para permitir acceso directo
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'trainers', loadComponent: () => import('./pages/trainers/trainers.component').then(m => m.TrainersComponent) },
      { path: 'captures', loadComponent: () => import('./pages/captures/captures.component').then(m => m.CapturesComponent) },
      { path: 'qr-manager', loadComponent: () => import('./pages/qr-manager/qr-manager.component').then(m => m.QrManagerComponent) },
      { path: 'settings', loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent) },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];