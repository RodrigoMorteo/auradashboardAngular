# Plan: Investigate and Resolve SSR Stability Issues

## Phase 1: Investigation and Reproduction
- [x] Task: Audit global configuration (app.config.ts) for browser-specific providers.
- [x] Task: Reproduce the SSR crash locally and capture full stack traces.
- [x] Task: Analyze the stack trace to definitively identify the offending module/line.

## Phase 2: Isolation and Remediation
- [x] Task: Debug and Fix Bootstrapping (NG0401).
    - [x] Subtask: Verify `provideServerRendering` and config merging.
    - [x] Subtask: Ensure `bootstrapApplication` receives the correct config.
- [x] Task: Refactor Chart.js integration to use dynamic imports and platform checks.
    - [x] Subtask: Write Tests: Verify chart component does not throw on server.
    - [x] Subtask: Implement Feature: Lazy load Chart.js and use `@defer`.
- [x] Task: Isolate Lit components from server-side execution.
    - [x] Subtask: Write Tests: Verify Lit wrapper component is safe for SSR.
    - [x] Subtask: Implement Feature: Guard Lit component registration with platform checks.
- [x] Task: Audit and Refactor Route Guards for SSR safety.
    - [x] Subtask: Write Tests: Verify guards do not access window/document.
    - [x] Subtask: Implement Feature: Update guards to be platform-agnostic.

## Phase 3: Verification
- [~] Task: Verify the full application build and SSR serve command.
- [ ] Task: Conductor - User Manual Verification 'Verification' (Protocol in workflow.md)
