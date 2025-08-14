import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import './app/features/user-profile-lit/user-profile-lit.component'; // Import Lit component to ensure it's registered

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
