import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const RoleGuard: CanActivateFn = () => {
  // Permitir acceso directo sin verificación de roles para demo
  return true;
  
  // Código original comentado:
  // const auth = inject(AuthService);
  // const router = inject(Router);
  // if (auth.isAuthenticated() && auth.hasRole('prof_ox','admin')) return true;
  // router.navigateByUrl('/auth/login');
  // return false;
};