import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'cv-theme';
  private readonly darkThemeSubject = new BehaviorSubject<boolean>(false);
  
  isDarkTheme$: Observable<boolean> = this.darkThemeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem(this.THEME_KEY);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      let isDark = false;
      if (savedTheme) {
        isDark = savedTheme === 'dark';
      } else {
        isDark = prefersDark;
      }
      
      this.setTheme(isDark);
      
      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(this.THEME_KEY)) {
          this.setTheme(e.matches);
        }
      });
    }
  }

  toggleTheme(): void {
    const currentTheme = this.darkThemeSubject.value;
    this.setTheme(!currentTheme);
  }

  setTheme(isDark: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      const body = document.body;
      
      if (isDark) {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        localStorage.setItem(this.THEME_KEY, 'dark');
      } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
        localStorage.setItem(this.THEME_KEY, 'light');
      }
      
      this.darkThemeSubject.next(isDark);
    }
  }

  isDarkTheme(): boolean {
    return this.darkThemeSubject.value;
  }

  getCurrentTheme(): string {
    return this.darkThemeSubject.value ? 'dark' : 'light';
  }
}