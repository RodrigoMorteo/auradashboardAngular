# Specification: Comprehensive Unit Testing

## Context
The current application has minimal test coverage. To ensure stability and facilitate future refactoring, we need to implement a robust unit testing suite for both the mock backend and the Angular frontend.

## Goals
1. **Backend Coverage:** Ensure all mock API endpoints are tested for success and failure cases, including pagination logic and state management.
2. **Frontend Coverage:** Achieve >80% coverage for core services, guards, and critical feature components.
3. **SSR Safety:** Specifically test that components with browser-specific dependencies (like Chart.js) handle SSR/Browser isolation correctly.

## Requirements
- Use `jasmine` and `supertest` (or similar) for backend tests.
- Use `jasmine` and `Karma` for Angular tests.
- All tests must pass in headless mode (`npm run test:ci`).
