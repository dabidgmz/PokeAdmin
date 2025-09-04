import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'Profesor Ox Panel';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Initialize theme service to load saved theme
    this.themeService.getCurrentTheme();
  }
}