import { HttpInterceptorFn } from '@angular/common/http';
import { storage } from '../utils/storage';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = storage.get<string>('authToken');
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
  return next(req);
};