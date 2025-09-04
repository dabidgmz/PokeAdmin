import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Rarity } from '../../core/models/capture';

@Component({
  selector: 'app-qr-manager',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule
  ],
  template: `
    <div class="space-y-8 fade-in">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          QR Manager Pokémon
        </h1>
        <p class="text-gray-600 text-lg">Genera códigos QR para Pokémon</p>
      </div>
      
      <!-- Generator Form -->
      <div class="glass-card p-6">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <mat-icon class="text-white">qr_code</mat-icon>
          </div>
          <h3 class="text-xl font-semibold text-gray-800">Generador de Códigos QR</h3>
        </div>
        
        <form [formGroup]="qrForm" (ngSubmit)="generateQRs()" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <mat-form-field appearance="outline">
              <mat-label>ID Mínimo</mat-label>
              <input matInput type="number" formControlName="minId" placeholder="1" class="text-gray-800">
              <mat-icon matPrefix class="text-gray-400 mr-2">looks_one</mat-icon>
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>ID Máximo</mat-label>
              <input matInput type="number" formControlName="maxId" placeholder="151" class="text-gray-800">
              <mat-icon matPrefix class="text-gray-400 mr-2">looks_two</mat-icon>
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Rareza</mat-label>
              <mat-select formControlName="rarity">
                <mat-option value="common">Común</mat-option>
                <mat-option value="rare">Raro</mat-option>
                <mat-option value="epic">Épico</mat-option>
                <mat-option value="legend">Legendario</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
          
          <button 
            mat-raised-button 
            type="submit"
            class="pokemon-btn text-lg py-3"
            [disabled]="qrForm.invalid"
          >
            <mat-icon class="mr-2">qr_code</mat-icon>
            Generar Códigos QR
          </button>
        </form>
      </div>
      
      <!-- Generated QR Codes -->
      <div *ngIf="generatedQRs.length > 0" class="space-y-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <h3 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            Códigos QR Generados ({{ generatedQRs.length }})
          </h3>
          <button mat-raised-button class="pokemon-btn" (click)="exportPDF()">
            <mat-icon class="mr-2">picture_as_pdf</mat-icon>
            Exportar PDF
          </button>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div *ngFor="let qr of generatedQRs" class="glass-card p-4 hover:scale-105 transition-transform duration-300">
            <div class="text-center">
              <div class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg">
                <mat-icon class="text-4xl text-gray-500">qr_code</mat-icon>
              </div>
              <h4 class="font-semibold text-gray-800 mb-1">{{ qr.name }}</h4>
              <p class="text-sm text-gray-600 mb-2">ID: {{ qr.id }}</p>
              <span 
                class="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
                [class.rarity-common]="qr.rarity === 'common'"
                [class.rarity-rare]="qr.rarity === 'rare'"
                [class.rarity-epic]="qr.rarity === 'epic'"
                [class.rarity-legend]="qr.rarity === 'legend'"
              >
                {{ qr.rarity }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class QrManagerComponent {
  qrForm: FormGroup;
  generatedQRs: any[] = [];

  constructor(private fb: FormBuilder) {
    this.qrForm = this.fb.group({
      minId: [1, [Validators.required, Validators.min(1)]],
      maxId: [151, [Validators.required, Validators.min(1)]],
      rarity: ['common', Validators.required]
    });
  }

  generateQRs() {
    if (this.qrForm.valid) {
      const { minId, maxId, rarity } = this.qrForm.value;
      this.generatedQRs = [];
      
      for (let id = minId; id <= maxId; id++) {
        this.generatedQRs.push({
          id,
          name: `Pokémon ${id}`,
          rarity
        });
      }
    }
  }

  exportPDF() {
    // Mock PDF export - in real implementation, use jsPDF or similar
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>QR Codes - ${new Date().toLocaleDateString()}</title></head>
          <body>
            <h1>Códigos QR Generados</h1>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
              ${this.generatedQRs.map(qr => `
                <div style="border: 1px solid #ccc; padding: 16px; text-align: center;">
                  <div style="width: 100px; height: 100px; background: #f0f0f0; margin: 0 auto 8px; display: flex; align-items: center; justify-content: center;">
                    QR Code
                  </div>
                  <h3>${qr.name}</h3>
                  <p>ID: ${qr.id}</p>
                  <span style="background: #e0e0e0; padding: 4px 8px; border-radius: 12px; font-size: 12px;">${qr.rarity}</span>
                </div>
              `).join('')}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }
}
