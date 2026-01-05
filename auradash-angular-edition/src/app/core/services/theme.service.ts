import { Injectable, PLATFORM_ID, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>('light');
  private renderer: Renderer2;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme) {
        this.setTheme(savedTheme);
      }
    }
  }

  get theme$() {
    return this.themeSubject.asObservable();
  }

  setTheme(theme: Theme) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
      if (theme === 'dark') {
        this.renderer.addClass(document.documentElement, 'dark');
      } else {
        this.renderer.removeClass(document.documentElement, 'dark');
      }
    }
    this.themeSubject.next(theme);
  }

  toggleTheme() {
    this.setTheme(this.themeSubject.value === 'light' ? 'dark' : 'light');
  }
}
