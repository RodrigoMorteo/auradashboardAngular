import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideServerRendering, ɵSERVER_CONTEXT as SERVER_CONTEXT } from '@angular/platform-server';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const config: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: SERVER_CONTEXT, useValue: 'ssr-test' },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch())
  ]
};
