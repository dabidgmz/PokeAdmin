import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  template: `
    <div class="space-y-6">
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
          <mat-icon class="text-2xl text-white">login</mat-icon>
        </div>
        <h2 class="text-3xl font-bold text-gray-800 mb-2">¡Bienvenido!</h2>
        <p class="text-gray-600">Accede al panel administrativo Pokémon</p>
      </div>
      
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <div class="space-y-4">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label class="text-gray-700">Correo electrónico</mat-label>
            <input matInput type="email" formControlName="email" placeholder="usuario&#64;utt.edu.mx" class="text-gray-800">
            <mat-icon matPrefix class="text-gray-400 mr-2">email</mat-icon>
            <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
              El correo es requerido
            </mat-error>
            <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
              Formato de correo inválido
            </mat-error>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="w-full">
            <mat-label class="text-gray-700">Contraseña</mat-label>
            <input matInput type="password" formControlName="password" placeholder="Mínimo 4 caracteres" class="text-gray-800">
            <mat-icon matPrefix class="text-gray-400 mr-2">lock</mat-icon>
            <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
              La contraseña es requerida
            </mat-error>
            <mat-error *ngIf="loginForm.get('password')?.hasError('minlength')">
              Mínimo 4 caracteres
            </mat-error>
          </mat-form-field>
        </div>
        
        <button 
          mat-raised-button 
          type="submit" 
          class="w-full pokemon-btn text-lg py-3"
          [disabled]="loginForm.invalid || loading"
        >
          <mat-icon class="mr-2" *ngIf="!loading">login</mat-icon>
          <mat-icon class="mr-2 animate-spin" *ngIf="loading">refresh</mat-icon>
          <span *ngIf="loading">Accediendo...</span>
          <span *ngIf="!loading">Acceder al Panel</span>
        </button>
      </form>
      
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div class="flex items-start space-x-3">
          <mat-icon class="text-blue-500 mt-1">info</mat-icon>
          <div class="text-sm text-blue-700">
            <p class="font-semibold mb-1">Demo Mode</p>
            <p>• Usa cualquier correo &#64;utt.edu.mx</p>
            <p>• Contraseña: mínimo 4 caracteres</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      try {
        const { email, password } = this.loginForm.value;
        const result = await this.authService.login(email, password);
        
        if (result.requires2fa) {
          this.router.navigateByUrl('/auth/2fa');
        }
      } catch (error) {
        this.toastService.error('Credenciales inválidas');
      } finally {
        this.loading = false;
      }
    }
  }
}