# Plan: Rebuild AuraDash Angular from Scratch

## Phase 1: Initialization and Setup [checkpoint: 84bde04]
- [x] Task: Clean up existing `app` directory (backup relevant source code to a temporary location if needed, then delete).
- [x] Task: Initialize new Angular 18/19 workspace (`ng new auradash-angular-edition --ssr`). b6f4898
- [x] Task: Install Tailwind CSS and configure it. 008d5d6
- [x] Task: Verify the fresh app builds and serves (SSR) without errors. f4696d3

## Phase 2: Core Architecture & Layout
- [x] Task: Set up the mock server proxy or ensure it runs in parallel. b8d1951
- [x] Task: Port `DashboardLayout`, `Sidebar`, and `Header` components. d102876
- [ ] Task: Implement Routing and `AuthGuard` (SSR-safe).

## Phase 3: Feature Migration
- [ ] Task: Implement `LoginComponent` and Auth Service.
- [ ] Task: Implement `KpiTrendsComponent` with Chart.js (Strict SSR isolation).
- [ ] Task: Implement `UserProfilePageComponent` and the Lit component integration (Strict SSR isolation).

## Phase 4: Final Verification
- [ ] Task: Verify the full application build and SSR serve command.
- [ ] Task: Conductor - User Manual Verification 'Final Verification' (Protocol in workflow.md)
