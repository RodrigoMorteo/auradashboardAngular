# Plan: Fix Angular SSR NG0401 Missing Platform Error

## Phase 1: Investigation
- [~] Task: Create a minimal reproduction within the current project (simplify config to bare minimum).
- [ ] Task: Investigate version compatibility between `@angular/ssr`, `@angular/core`, and `@angular/build`.
- [ ] Task: Debug `internalCreateApplication` platform check (if possible via node_modules modification or deeper logging).

## Phase 2: Remediation
- [ ] Task: Apply fix based on investigation (e.g., downgrade/upgrade packages, change bootstrap pattern).
    - [ ] Subtask: Verify fix with `ng serve`.
    - [ ] Subtask: Verify fix with production build.

## Phase 3: Verification
- [ ] Task: Conductor - User Manual Verification 'Verification' (Protocol in workflow.md)
