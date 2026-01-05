# Plan: Rebuild AuraDash Angular from Scratch

## Phase 1: Initialization and Setup
- [ ] Task: Clean up existing `app` directory (backup relevant source code to a temporary location if needed, then delete).
- [ ] Task: Initialize new Angular 18/19 workspace (`ng new auradash-angular-edition --ssr`).
- [ ] Task: Install Tailwind CSS and configure it.
- [ ] Task: Verify the fresh app builds and serves (SSR) without errors.

## Phase 2: Core Architecture & Layout
- [ ] Task: Set up the mock server proxy or ensure it runs in parallel.
- [ ] Task: Port `DashboardLayout`, `Sidebar`, and `Header` components.
- [ ] Task: Implement Routing and `AuthGuard` (SSR-safe).

## Phase 3: Feature Migration
- [ ] Task: Implement `LoginComponent` and Auth Service.
- [ ] Task: Implement `KpiTrendsComponent` with Chart.js (Strict SSR isolation).
- [ ] Task: Implement `UserProfilePageComponent` and the Lit component integration (Strict SSR isolation).

## Phase 4: Final Verification
- [ ] Task: Verify the full application build and SSR serve command.
- [ ] Task: Conductor - User Manual Verification 'Final Verification' (Protocol in workflow.md)
