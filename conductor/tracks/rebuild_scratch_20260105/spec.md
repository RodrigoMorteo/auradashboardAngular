# Specification: Rebuild AuraDash Angular from Scratch

## Context
The previous attempt to fix `NG0401` errors in the AuraDash project (v21.0.x) failed due to persistent SSR platform context issues and likely version mismatches. A decision was made to reboot the project on a clean slate.

## Goals
1.  **Stable Foundation:** Initialize a new Angular workspace using a stable, widely supported version (targeting Angular 18 LTS or a stable 19 release) with working SSR out-of-the-box.
2.  **Feature Parity:** Port the core AuraDash features:
    -   Dashboard Layout with Sidebar/Header.
    -   Auth (Login/Guards).
    -   KPI Trends (Chart.js integration).
    -   Shadow DOM challenges (Lit integration).
    -   User Profile page.
3.  **Correct Architecture:** Ensure all browser-specific libraries (Chart.js, Lit) are correctly isolated from the SSR process using standard Angular 17+ patterns (`afterNextRender`, `isPlatformBrowser`).

## Tech Stack (Revised)
-   **Framework:** Angular 18 (LTS) or 19 (Stable).
-   **Styling:** Tailwind CSS.
-   **SSR:** Angular SSR (Hydration enabled).
-   **Mock Server:** Express.js (reused from existing).
