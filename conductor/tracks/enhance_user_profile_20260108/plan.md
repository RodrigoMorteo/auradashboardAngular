# Plan: Enhance User Profile with Form Controls

## Phase 1: Backend & Data
- [x] Task: Update `mock-server/data/default.json` (and others) with new profile fields (`emailNotifications`, `smsNotifications`, `marketingFrequency`). 8d45267
- [x] Task: Update `mock-server/server.js` to handle `POST /api/user/profile` and update the in-memory state. 8d45267

## Phase 2: Frontend Implementation
- [x] Task: Update `UserProfile` interface in the frontend to match the new data model. bb6654f
- [x] Task: Update `UserProfilePageComponent` to include the "Communication Preferences" section with Reactive Forms. bb6654f
- [x] Task: Implement the "Save Changes" logic and connect it to the backend. bb6654f

## Phase 3: Testing
- [x] Task: Update unit tests for `UserProfilePageComponent` to cover the new form logic. bb6654f
- [x] Task: Create or update Playwright tests (`tests/profile.spec.ts`) to verify checkboxes and radio buttons. b6157ef
