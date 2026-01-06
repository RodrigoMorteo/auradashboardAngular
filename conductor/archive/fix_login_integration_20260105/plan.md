# Plan: Fix Login and Mock Server Integration

## Phase 1: Diagnostics and Fixes
- [x] Task: Manually start the mock server and verify it responds to login requests via `curl`. e64a309
- [x] Task: Verify Angular `proxy.conf.json` matches the mock server port (3001). 0000000
- [x] Task: Verify the `LoginComponent` correctly handles the API response and redirects upon success. 0000000

## Phase 2: Integration & DX Improvements
- [x] Task: Update `package.json` in the project root to include a command that starts both the Angular app and the mock server. 0000000
- [x] Task: Update `README.md` with instructions on how to start the development environment. 0000000

## Phase 3: Final Verification
- [x] Task: Perform manual login verification using the browser. c82bec9
