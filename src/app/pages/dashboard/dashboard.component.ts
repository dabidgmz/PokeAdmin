import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatListModule],
  template: `
    <div class="space-y-8 fade-in">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Dashboard Pokémon
        </h1>
        <p class="text-gray-600 text-lg">Resumen del sistema PokeTrainer</p>
      </div>
      
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Total Trainers -->
        <div class="p-6 rounded-2xl" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);">
          <div class="flex items-center justify-between text-white">
            <div>
              <h3 class="text-3xl font-bold">{{ totalTrainers }}</h3>
              <p class="text-white text-opacity-90">Total Entrenadores</p>
            </div>
            <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <mat-icon class="text-3xl">people</mat-icon>
            </div>
          </div>
        </div>
        
        <!-- Total Captures -->
        <div class="p-6 rounded-2xl" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);">
          <div class="flex items-center justify-between text-white">
            <div>
              <h3 class="text-3xl font-bold">{{ totalCaptures }}</h3>
              <p class="text-white text-opacity-90">Capturas Totales</p>
            </div>
            <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <mat-icon class="text-3xl">catching_pokemon</mat-icon>
            </div>
          </div>
        </div>
        
        <!-- Active Trainers -->
        <div class="p-6 rounded-2xl" style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);">
          <div class="flex items-center justify-between text-white">
            <div>
              <h3 class="text-3xl font-bold">{{ activeTrainers }}</h3>
              <p class="text-white text-opacity-90">Entrenadores Activos</p>
            </div>
            <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <mat-icon class="text-3xl">star</mat-icon>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Top Species -->
      <div class="glass-card p-6">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <mat-icon class="text-white">emoji_events</mat-icon>
          </div>
          <h3 class="text-2xl font-bold text-gray-800">Top Especies Capturadas</h3>
        </div>
        
        <div class="space-y-4">
          <div *ngFor="let species of topSpecies; let i = index" 
               class="flex items-center justify-between p-4 bg-white bg-opacity-50 rounded-xl hover:bg-opacity-70 transition-all duration-300">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {{ i + 1 }}
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">{{ species.name }}</h4>
                <p class="text-sm text-gray-600">Especie Pokémon</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-gray-800">{{ species.count }}</p>
              <p class="text-sm text-gray-600">capturas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  totalTrainers = 0;
  totalCaptures = 0;
  activeTrainers = 0;
  topSpecies = [
    { name: 'Pikachu', count: 45 },
    { name: 'Charizard', count: 32 },
    { name: 'Blastoise', count: 28 },
    { name: 'Venusaur', count: 25 },
    { name: 'Mewtwo', count: 12 }
  ];

  constructor(private userService: UserService) {}

  ngOnInit() {
    const trainers = this.userService.getTrainers();
    this.totalTrainers = trainers.length;
    this.activeTrainers = trainers.filter(t => !t.bannedUntil).length;
    this.totalCaptures = trainers.reduce((sum, t) => sum + t.teamCount, 0);
  }
}