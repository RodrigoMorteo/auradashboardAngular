# Plan: Comprehensive Unit Testing

## Phase 1: Backend Testing (Mock Server)
- [x] Task: Set up a testing framework for the mock server (e.g., `jest` or `mocha/chai/supertest`). 700816d
- [x] Task: Implement tests for Auth endpoints (`/api/auth/login`). 700816d
- [x] Task: Implement tests for State Reset (`/api/state/reset`). 700816d
- [x] Task: Implement tests for Widget endpoints with pagination (`sales-records`, `activity-feed`). 700816d

## Phase 2: Frontend Core Testing
- [x] Task: Implement unit tests for `AuthService` covering token management and login flow. 004e020
- [x] Task: Implement unit tests for `ThemeService`. a566b8b
- [x] Task: Implement unit tests for `authGuard` (authenticated vs unauthenticated routes). 79b0028

## Phase 3: Frontend Component Testing
- [x] Task: Implement unit tests for `LoginComponent` (validation, error handling). 444f65e
- [ ] Task: Implement unit tests for `KpiTrendsComponent` (verifying Chart.js is not initialized on server).
- [ ] Task: Implement unit tests for `SalesRecordsComponent`.

## Phase 4: Verification
- [ ] Task: Run full test suite and verify coverage report.
