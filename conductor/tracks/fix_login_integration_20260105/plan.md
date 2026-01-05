# Plan: Fix Login and Mock Server Integration

## Phase 1: Diagnostics and Fixes
- [~] Task: Manually start the mock server and verify it responds to login requests via `curl`.
- [ ] Task: Verify Angular `proxy.conf.json` matches the mock server port (3001).
- [ ] Task: Verify the `LoginComponent` correctly handles the API response and redirects upon success.

## Phase 2: Integration & DX Improvements
- [ ] Task: Update `package.json` in the project root to include a command that starts both the Angular app and the mock server.
- [ ] Task: Update `README.md` with instructions on how to start the development environment.

## Phase 3: Final Verification
- [ ] Task: Perform manual login verification using the browser.
