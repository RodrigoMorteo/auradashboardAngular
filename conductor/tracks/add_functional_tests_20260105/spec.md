# Specification: Add Functional Tests with Playwright

## Objective
Implement functional tests for the AuraDash Angular application using Playwright and TypeScript. The goal is to ensure core features work as expected.

## Context
Playwright is already installed and configured in the project (`playwright.config.ts`, `tests/` directory).

## Requirements
1.  **Test Scope**:
    *   **Authentication**: Login success, login failure (invalid credentials).
    *   **Dashboard**: Verify dashboard loads, KPI cards are visible.
    *   **Navigation**: Verify sidebar navigation works (e.g., to "Sales Records" or "Profile").
2.  **Tech Stack**: Playwright, TypeScript.
3.  **Location**: Tests should reside in the `tests/` directory.

## Constraints
- Use existing project configuration.
- Ensure tests pass against the local development server (which includes the mock server).
