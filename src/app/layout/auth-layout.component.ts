import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatCardModule, MatIconModule],
  template: `
    <div class="min-h-screen relative overflow-hidden">
      <!-- Background with animated elements -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500"></div>
      <div class="absolute inset-0 bg-black bg-opacity-20"></div>
      
      <!-- Floating Pokemon elements -->
      <div class="absolute top-20 left-10 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
      <div class="absolute top-40 right-20 w-12 h-12 bg-red-400 rounded-full opacity-20 animate-pulse"></div>
      <div class="absolute bottom-32 left-20 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-bounce delay-1000"></div>
      <div class="absolute bottom-20 right-10 w-14 h-14 bg-green-400 rounded-full opacity-20 animate-pulse delay-500"></div>
      
      <!-- Main content -->
      <div class="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-md">
          <!-- Logo and title -->
          <div class="text-center mb-8 fade-in">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-4 backdrop-blur-sm">
              <mat-icon class="text-4xl text-white">psychology</mat-icon>
            </div>
            <h1 class="text-4xl font-bold text-white mb-2 drop-shadow-lg">Profesor Ox</h1>
            <p class="text-white text-opacity-90 text-lg">Panel Administrativo Pokémon</p>
          </div>
          
          <!-- Auth card -->
          <div class="glass-card p-8 fade-in">
            <router-outlet></router-outlet>
          </div>
          
          <!-- Footer -->
          <div class="text-center mt-6 fade-in">
            <p class="text-white text-opacity-70 text-sm">© 2024 PokeTrainer PWA</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AuthLayoutComponent {}