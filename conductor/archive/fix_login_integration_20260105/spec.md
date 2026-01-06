# Specification: Fix Login and Mock Server Integration

## Context
After rebuilding the application from scratch, users report they cannot log in with default credentials. Preliminary investigation shows the mock server is likely not running, and there is no unified process to ensure both the frontend and the mock backend are operational.

## Goals
1. **Restore Login Functionality:** Ensure the `test@example.com` / `password123` credentials work as expected.
2. **Improve Developer Experience:** Streamline the process of running the mock server alongside the Angular application.
3. **Verify Connectivity:** Confirm the Angular proxy is correctly routing requests to the mock server.

## Requirements
- The Angular application must proxy `/api` requests to `http://localhost:3001`.
- The mock server must be running and serving data from `mock-server/data/default.json`.
- Provide a clear way (script or documentation) to start the full stack.
