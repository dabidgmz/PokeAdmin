import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { storage } from '../utils/storage';
import { User, LoginResult } from '../models/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authKey = 'authToken';
  private userKey = 'authUser';
  private tempKey = 'tempToken';

  constructor(private router: Router) {}

  async login(email: string, password: string): Promise<LoginResult> {
    if (!email.includes('@utt.edu.mx') || password.length < 4) {
      throw new Error('Credenciales inválidas');
    }
    storage.set(this.tempKey, 'temp-2fa-' + Date.now());
    storage.set<User>(this.userKey, {
      id: crypto.randomUUID(),
      email,
      name: 'Profesor Ox',
      role: 'prof_ox',
    });
    return { requires2fa: true, tempToken: storage.get<string>(this.tempKey) ?? undefined };
  }

  async verify2fa(code: string): Promise<boolean> {
    if (code === '123456' && storage.get<string>(this.tempKey)) {
      storage.set(this.authKey, 'mock-jwt');
      storage.remove(this.tempKey);
      return true;
    }
    return false;
  }

  logout() {
    storage.remove(this.authKey);
    storage.remove(this.userKey);
    storage.remove(this.tempKey);
    this.router.navigateByUrl('/auth/login');
  }

  isAuthenticated(): boolean {
    return !!storage.get<string>(this.authKey);
  }

  getUser(): User | null {
    return storage.get<User>(this.userKey);
  }

  hasRole(...roles: Array<User['role']>): boolean {
    const u = this.getUser();
    return !!u && roles.includes(u.role);
  }
}