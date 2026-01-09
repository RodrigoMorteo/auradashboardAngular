# Plan: Add Functional Tests with Playwright

## Phase 1: Configuration Verification [checkpoint: 95fc925]
- [x] Task: Verify `playwright.config.ts` matches the current local server setup (port 4200/3001). 868f65b
- [x] Task: Ensure the `tests/` directory is clean or prepared for new tests. 868f65b

## Phase 2: Test Implementation
- [ ] Task: Create `tests/auth.spec.ts` for Login scenarios (success, failure).
- [ ] Task: Create `tests/dashboard.spec.ts` for Dashboard visibility (KPIs, layout).
- [ ] Task: Create `tests/navigation.spec.ts` for Sidebar navigation verification.

## Phase 3: Execution and Refinement
- [ ] Task: Run all tests using `npx playwright test`.
- [ ] Task: Add a script to `package.json` for running E2E tests if one doesn't exist.
