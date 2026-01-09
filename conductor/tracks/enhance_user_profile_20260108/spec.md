# Specification: Enhance User Profile with Form Controls

## Objective
Add interactive form controls (checkboxes and radio buttons) to the User Profile page to enhance the application's utility as a System Under Test (SUT) for form interaction testing.

## Context
The current User Profile page displays static details and a theme switcher. To better test automation frameworks, we need standard form elements that require state verification.

## Requirements

### 1. Data Model & Backend
*   **New Fields:** Extend the user profile data model to include:
    *   `emailNotifications` (boolean)
    *   `smsNotifications` (boolean)
    *   `marketingFrequency` (enum/string: 'Daily', 'Weekly', 'Monthly')
*   **API:** Implement `POST /api/user/profile` in the mock server to allow updating these fields.
*   **Mock Data:** Update `default.json` (and other profiles) with default values for these fields.

### 2. Frontend (User Profile Page)
*   **Section:** Add a new "Communication Preferences" section to the `UserProfilePageComponent`.
*   **UI Elements:**
    *   **Checkboxes:**
        *   "Email Notifications"
        *   "SMS Notifications"
    *   **Radio Buttons:**
        *   "Marketing Frequency" group with options: "Daily", "Weekly", "Monthly".
*   **Behavior:**
    *   Controls should initialize with data from the backend.
    *   Changes should be persisted to the backend (either auto-save or a "Save Changes" button). *Decision: Use a "Save Changes" button to test explicit submission.*

### 3. Testing
*   **Unit Tests:** Verify form initialization and submission logic.
*   **E2E Tests (Playwright):**
    *   Verify controls are visible.
    *   Verify checking/unchecking checkboxes updates state.
    *   Verify radio button selection is mutually exclusive.
    *   Verify persistence after reload (optional, depending on mock server state persistence during test).

## Technical Constraints
*   Use Angular Reactive Forms.
*   Ensure accessibility (labels associated with inputs).
*   Maintain existing styling (Tailwind CSS).
