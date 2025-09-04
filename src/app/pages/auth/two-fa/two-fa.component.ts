import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { OtpInputComponent } from '../../../shared/components/otp-input/otp-input.component';

@Component({
  selector: 'app-two-fa',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, OtpInputComponent],
  template: `
    <div class="space-y-6">
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-4">
          <mat-icon class="text-2xl text-white">security</mat-icon>
        </div>
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Verificación 2FA</h2>
        <p class="text-gray-600">Ingresa el código de 6 dígitos enviado a tu dispositivo</p>
      </div>
      
      <div class="space-y-6">
        <div class="flex justify-center">
          <app-otp-input 
            [hasError]="hasError"
            (completed)="onOtpCompleted($event)"
          ></app-otp-input>
        </div>
        
        <button 
          mat-raised-button 
          class="w-full pokemon-btn text-lg py-3"
          [disabled]="loading"
          (click)="verifyCode()"
        >
          <mat-icon class="mr-2" *ngIf="!loading">verified_user</mat-icon>
          <mat-icon class="mr-2 animate-spin" *ngIf="loading">refresh</mat-icon>
          <span *ngIf="loading">Verificando...</span>
          <span *ngIf="!loading">Verificar Código</span>
        </button>
      </div>
      
      <div class="bg-green-50 border border-green-200 rounded-xl p-4">
        <div class="flex items-start space-x-3">
          <mat-icon class="text-green-500 mt-1">info</mat-icon>
          <div class="text-sm text-green-700">
            <p class="font-semibold mb-1">Código Demo</p>
            <p>Usa el código: <strong class="text-lg">123456</strong></p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TwoFaComponent {
  otpCode = '';
  loading = false;
  hasError = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  onOtpCompleted(code: string) {
    this.otpCode = code;
    this.hasError = false;
  }

  async verifyCode() {
    if (this.otpCode.length !== 6) {
      this.hasError = true;
      return;
    }

    this.loading = true;
    try {
      const isValid = await this.authService.verify2fa(this.otpCode);
      if (isValid) {
        this.toastService.success('Autenticación completada');
        this.router.navigateByUrl('/dashboard');
      } else {
        this.hasError = true;
        this.toastService.error('Código inválido');
      }
    } catch (error) {
      this.hasError = true;
      this.toastService.error('Error en la verificación');
    } finally {
      this.loading = false;
    }
  }
}