import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = () => {
  // Permitir acceso directo sin autenticación para demo
  return true;
  
  // Código original comentado:
  // const auth = inject(AuthService);
  // const router = inject(Router);
  // if (auth.isAuthenticated()) return true;
  // router.navigateByUrl('/auth/login');
  // return false;
};