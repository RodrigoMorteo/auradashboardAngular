# Plan: Investigate and Resolve SSR Stability Issues

## Phase 1: Investigation and Reproduction
- [ ] Task: Audit global configuration (app.config.ts) for browser-specific providers.
- [ ] Task: Reproduce the SSR crash locally and capture full stack traces.
- [ ] Task: Analyze the stack trace to definitively identify the offending module/line.

## Phase 2: Isolation and Remediation
- [ ] Task: Refactor Chart.js integration to use dynamic imports and platform checks.
    - [ ] Subtask: Write Tests: Verify chart component does not throw on server.
    - [ ] Subtask: Implement Feature: Lazy load Chart.js and use `@defer`.
- [ ] Task: Isolate Lit components from server-side execution.
    - [ ] Subtask: Write Tests: Verify Lit wrapper component is safe for SSR.
    - [ ] Subtask: Implement Feature: Guard Lit component registration with platform checks.
- [ ] Task: Audit and Refactor Route Guards for SSR safety.
    - [ ] Subtask: Write Tests: Verify guards do not access window/document.
    - [ ] Subtask: Implement Feature: Update guards to be platform-agnostic.

## Phase 3: Verification
- [ ] Task: Verify the full application build and SSR serve command.
- [ ] Task: Conductor - User Manual Verification 'Verification' (Protocol in workflow.md)
