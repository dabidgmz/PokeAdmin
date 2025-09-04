import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { storage } from '../utils/storage';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkThemeSubject = new BehaviorSubject<boolean>(false);
  public isDarkTheme$ = this.isDarkThemeSubject.asObservable();

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme() {
    // Check localStorage first, then system preference
    const savedTheme = storage.get<boolean>('darkTheme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldUseDark = savedTheme !== null ? savedTheme : systemPrefersDark;
    
    this.setTheme(shouldUseDark);
  }

  public toggleTheme() {
    const currentTheme = this.isDarkThemeSubject.value;
    this.setTheme(!currentTheme);
  }

  public setTheme(isDark: boolean) {
    this.isDarkThemeSubject.next(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      storage.set('darkTheme', true);
    } else {
      document.documentElement.classList.remove('dark');
      storage.set('darkTheme', false);
    }
  }

  public getCurrentTheme(): boolean {
    return this.isDarkThemeSubject.value;
  }
}

