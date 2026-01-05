import { TestBed } from '@angular/core/testing';
import { ThemeService, Theme } from './theme.service';
import { PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';

describe('ThemeService', () => {
  let service: ThemeService;
  let renderer: jasmine.SpyObj<Renderer2>;

  beforeEach(() => {
    renderer = jasmine.createSpyObj('Renderer2', ['addClass', 'removeClass']);
    const rendererFactory = jasmine.createSpyObj('RendererFactory2', ['createRenderer']);
    rendererFactory.createRenderer.and.returnValue(renderer);

    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: RendererFactory2, useValue: rendererFactory }
      ]
    });

    localStorage.clear();
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to light theme', (done) => {
    service.theme$.subscribe(theme => {
      expect(theme).toBe('light');
      done();
    });
  });

  it('should set dark theme', () => {
    service.setTheme('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(renderer.addClass).toHaveBeenCalledWith(jasmine.any(Object), 'dark');
  });

  it('should set light theme', () => {
    service.setTheme('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(renderer.removeClass).toHaveBeenCalledWith(jasmine.any(Object), 'dark');
  });

  it('should toggle theme', () => {
    service.toggleTheme(); // light -> dark
    expect(localStorage.getItem('theme')).toBe('dark');
    service.toggleTheme(); // dark -> light
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
