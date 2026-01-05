import { ApplicationConfig, provideZoneChangeDetection, PLATFORM_ID, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { provideServerRendering } from '@angular/platform-server';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    // Add server rendering if on server
    // (Note: This is usually handled by app.config.server.ts but adding here for safety)
  ]  
};