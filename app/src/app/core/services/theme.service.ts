import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _theme = signal<string>('light');
  public readonly theme = this._theme.asReadonly();

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme() {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      this.setTheme(storedTheme);
    }
  }

  public setTheme(theme: string) {
    this._theme.set(theme);
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }

  public toggleTheme() {
    this.setTheme(this._theme() === 'light' ? 'dark' : 'light');
  }
}
