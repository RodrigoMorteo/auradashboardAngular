While fixing critical vulnerabilities from the previusly used angular version, we had dependency issues with the chart component that forced us to change the chart library used. 
From there, the app has been experimenting a set of issues, mainly related to a Missing Platform SSR error. Here is a summary of the debugging session and architectural changes made to resolve the NG0401: Missing Platform SSR error in the Angular application. You can use this to prime a new session.

Issue Summary: Angular SSR NG0401: Missing Platform
Context: The application was crashing during Server-Side Rendering (SSR) bootstrap because browser-specific libraries (Chart.js, Lit components, ngx-toastr) and static imports were executing code accessing window/document in the Node.js environment.

Resolution Architecture:

Chart.js Isolation (KpiTrendsComponent):

Replaced ngx-charts with chart.js (via manual integration, removed ng2-charts providers to avoid global side effects).
Dynamic Import: Switched from static top-level imports to await import('chart.js') inside initChart() to ensure the library is never loaded on the server.
Template Guard: Used @defer (when isBrowser()) to prevent server-side rendering of the canvas.
Routing & Guards (app.routes.ts):

Problem: Static imports of components (especially the Lit-based UserProfilePageComponent) and guards caused eager evaluation of browser code during server startup.
Fix: Converted all route components to Lazy Loading using loadComponent: () => import(...).
Fix: Converted authGuard to lazy loading within canActivate.
Global Configuration (app.config.ts):

Removed browser-specific providers (provideToastr, provideAnimations, errorInterceptor) that triggered side effects.
Standardized on provideZoneChangeDetection({ eventCoalescing: true }) and provideClientHydration(withEventReplay()) for stability.
Server Entry Point (main.server.ts & app.config.server.ts):

Updated main.server.ts to import AppComponent directly (bypassing barrel files).
Simplified app.config.server.ts to use only provideServerRendering() from @angular/platform-server.
Current Status: The application architecture is now SSR-safe. All browser-dependent logic is deferred until the client-side hydration phase or lazy-loaded on demand.

The README.md at the root folder has some documentation over the app's purpose and how to use it.