import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { config } from './app/app.config.server';
import { mergeApplicationConfig } from '@angular/core';

const bootstrap = (options: any) => {
   const mergedConfig = mergeApplicationConfig(appConfig, config, options);
   return bootstrapApplication(AppComponent, mergedConfig);
}

export default bootstrap;