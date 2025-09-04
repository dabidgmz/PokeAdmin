import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { ToastService } from '../../core/services/toast.service';
import { storage } from '../../core/utils/storage';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDividerModule
  ],
  template: `
    <div class="space-y-8 fade-in">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-gray-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Configuración
        </h1>
        <p class="text-gray-600 text-lg">Ajustes del sistema Pokémon</p>
      </div>
      
      <!-- Appearance Settings -->
      <div class="glass-card p-6">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <mat-icon class="text-white">palette</mat-icon>
          </div>
          <h3 class="text-xl font-semibold text-gray-800">Apariencia</h3>
        </div>
        
        <div class="flex items-center justify-between p-4 bg-white bg-opacity-50 rounded-xl">
          <div class="flex items-center space-x-4">
            <mat-icon class="text-gray-500">dark_mode</mat-icon>
            <div>
              <h4 class="font-medium text-gray-800">Tema Oscuro</h4>
              <p class="text-sm text-gray-600">Cambiar entre tema claro y oscuro</p>
            </div>
          </div>
          <mat-slide-toggle 
            [checked]="isDarkTheme" 
            (change)="toggleTheme($event.checked)"
            class="scale-125"
          ></mat-slide-toggle>
        </div>
      </div>
      
      <!-- Security Settings -->
      <div class="glass-card p-6">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <mat-icon class="text-white">security</mat-icon>
          </div>
          <h3 class="text-xl font-semibold text-gray-800">Seguridad</h3>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-white bg-opacity-50 rounded-xl">
            <div class="flex items-center space-x-4">
              <mat-icon class="text-blue-500">verified_user</mat-icon>
              <div>
                <h4 class="font-medium text-gray-800">Autenticación 2FA</h4>
                <p class="text-sm text-gray-600">Configurar verificación por correo/SMS</p>
              </div>
            </div>
            <button mat-raised-button class="pokemon-btn" disabled>
              <mat-icon class="mr-2">security</mat-icon>
              Próximamente
            </button>
          </div>
          
          <div class="flex items-center justify-between p-4 bg-white bg-opacity-50 rounded-xl">
            <div class="flex items-center space-x-4">
              <mat-icon class="text-green-500">lock</mat-icon>
              <div>
                <h4 class="font-medium text-gray-800">Cambiar Contraseña</h4>
                <p class="text-sm text-gray-600">Actualizar tu contraseña de acceso</p>
              </div>
            </div>
            <button mat-raised-button class="pokemon-btn" disabled>
              <mat-icon class="mr-2">lock</mat-icon>
              Próximamente
            </button>
          </div>
        </div>
      </div>
      
      <!-- System Settings -->
      <div class="glass-card p-6">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <mat-icon class="text-white">settings</mat-icon>
          </div>
          <h3 class="text-xl font-semibold text-gray-800">Sistema</h3>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-white bg-opacity-50 rounded-xl">
            <div class="flex items-center space-x-4">
              <mat-icon class="text-red-500">delete_sweep</mat-icon>
              <div>
                <h4 class="font-medium text-gray-800">Limpiar Caché Local</h4>
                <p class="text-sm text-gray-600">Eliminar todos los datos almacenados localmente</p>
              </div>
            </div>
            <button mat-raised-button class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full" (click)="clearCache()">
              <mat-icon class="mr-2">delete_sweep</mat-icon>
              Limpiar
            </button>
          </div>
          
          <div class="flex items-center justify-between p-4 bg-white bg-opacity-50 rounded-xl">
            <div class="flex items-center space-x-4">
              <mat-icon class="text-purple-500">download</mat-icon>
              <div>
                <h4 class="font-medium text-gray-800">Exportar Configuración</h4>
                <p class="text-sm text-gray-600">Descargar configuración actual del sistema</p>
              </div>
            </div>
            <button mat-raised-button class="pokemon-btn" (click)="exportSettings()">
              <mat-icon class="mr-2">download</mat-icon>
              Exportar
            </button>
          </div>
        </div>
      </div>
      
      <!-- App Information -->
      <div class="glass-card p-6">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
            <mat-icon class="text-white">info</mat-icon>
          </div>
          <h3 class="text-xl font-semibold text-gray-800">Información de la App</h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 bg-white bg-opacity-50 rounded-xl text-center">
            <mat-icon class="text-blue-500 text-2xl mb-2">tag</mat-icon>
            <p class="font-semibold text-gray-800">Versión</p>
            <p class="text-sm text-gray-600">1.0.0</p>
          </div>
          
          <div class="p-4 bg-white bg-opacity-50 rounded-xl text-center">
            <mat-icon class="text-green-500 text-2xl mb-2">update</mat-icon>
            <p class="font-semibold text-gray-800">Última Actualización</p>
            <p class="text-sm text-gray-600">{{ lastUpdate }}</p>
          </div>
          
          <div class="p-4 bg-white bg-opacity-50 rounded-xl text-center">
            <mat-icon class="text-purple-500 text-2xl mb-2">code</mat-icon>
            <p class="font-semibold text-gray-800">Entorno</p>
            <p class="text-sm text-gray-600">Desarrollo</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SettingsComponent implements OnInit {
  isDarkTheme = false;
  lastUpdate = new Date().toLocaleDateString();

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    // Check if dark theme is enabled
    this.isDarkTheme = document.documentElement.classList.contains('dark');
  }

  toggleTheme(checked: boolean) {
    this.isDarkTheme = checked;
    if (checked) {
      document.documentElement.classList.add('dark');
      storage.set('darkTheme', true);
    } else {
      document.documentElement.classList.remove('dark');
      storage.set('darkTheme', false);
    }
    this.toastService.success(`Tema ${checked ? 'oscuro' : 'claro'} activado`);
  }

  clearCache() {
    if (confirm('¿Estás seguro de que quieres limpiar todos los datos locales?')) {
      storage.clear();
      this.toastService.success('Caché local limpiado correctamente');
      // Reload page to reset application state
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  exportSettings() {
    const settings = {
      darkTheme: this.isDarkTheme,
      lastUpdate: this.lastUpdate,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `profesor-ox-settings-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
    
    this.toastService.success('Configuración exportada correctamente');
  }
}