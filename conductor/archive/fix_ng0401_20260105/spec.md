# Specification: Fix Angular SSR NG0401 Missing Platform Error

## Context
The application fails to run in SSR mode (via `ng serve` or `ng build` route extraction) with the error: `NG0401: Missing Platform: This may be due to using bootstrapApplication on the server without passing a BootstrapContext.`
This error persists despite `provideServerRendering()` being present in the configuration.

## Goals
1.  **Isolate the Root Cause:** Determine why `bootstrapApplication` is not receiving or recognizing the server platform context.
2.  **Fix Configuration:** Correct any misconfigurations in `app.config.server.ts`, `main.server.ts`, or `angular.json`.
3.  **Validate Fix:** Ensure `ng serve` starts without error and SSR works (curl returns HTML).

## Constraints
-   Must use Angular 19+ standalone APIs (`bootstrapApplication`).
-   Must maintain existing functionality.
