# AuraDash (Angular Edition)

Welcome to AuraDash, a modern System Under Test (SUT) meticulously designed to validate the capabilities of contemporary test automation frameworks.

This application is not a commercial product but a testing crucible. Each feature is deliberately chosen to probe the limits of automation tools and promote best practices in test script development. It is built on a modern stack featuring Angular 19, Tailwind CSS, and Lit to provide a rich and challenging surface for test automation.

***

### Core Tenets

*   **Challenging by Design:** Features like Shadow DOM, interactive SVG charts, infinite scroll, and drag-and-drop are included specifically to test a framework's resilience against common automation pain points.
*   **Built for Testability:** The most important feature is the mock backend's programmatic state control. A dedicated API endpoint (`/api/state/reset`) allows tests to set the application's state to a known baseline, enabling idempotent and non-flaky test runs.
*   **Deployment Simplicity:** The entire application can be launched with a single command, eliminating environment-specific setup issues and providing a consistent testing target.

### Technology Stack

| Technology         | Role in AuraDash                                               | Primary Testing Challenge                                                    |
| ------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Angular 19**     | Core SPA Framework (with SSR)                                  | Component lifecycle, SSR hydration, Signals reactivity, and route guards.      |
| **Tailwind CSS 3** | Utility-First Styling                                          | Locator strategy robustness (semantic vs utility classes), responsive layout. |
| **Lit 3**          | Encapsulated Web Components                                    | Shadow DOM traversal and event handling within isolated components.          |
| **Chart.js**       | Data Visualization                                             | Interacting with and asserting on dynamic Canvas/SVG elements and tooltips.    |
| **Node.js/Express**| Mock API & Data Source                                         | Network mocking, loading states, error handling, and programmatic data seeding.|
| **Docker**         | Infrastructure                                                 | Ensuring a consistent, one-command deployment environment.                   |

***

### Getting Started

You can run AuraDash locally using Node.js or via Docker. Docker is the recommended method for the most consistent experience.

#### **Prerequisites**
*   Node.js v18 or later
*   npm v9 or later
*   Docker and Docker Compose (for containerized setup)

---

#### **Option 1: Running with Docker (Recommended)**

This is the simplest and most reliable way to run AuraDash.

1.  **Clone the repository.**
2.  **Run the application from the root:**
    ```bash
    docker-compose up
    ```
3.  **Open your browser to `http://localhost`**.

---

#### **Option 2: Running Locally**

This is the preferred method for development. You can start both the mock server and the Angular application from the root directory using the unified dev script.

1.  **Install dependencies in the root:**
    ```bash
    npm install
    ```
2.  **Start both services:**
    ```bash
    npm run dev
    ```
3.  **Open your browser to `http://localhost:4200`**.

---

### Running Unit Tests

You can run unit tests for both the Angular application and the mock backend from the root directory.

#### **All Tests**
```bash
npm test
```

#### **Individual Projects**
```bash
# Frontend only
npm run test:app

# Backend only
npm run test:mock
```

#### **Running in WSL (Windows Subsystem for Linux)**
If you are running in WSL and encounter issues with the Chrome binary during frontend tests, you can point to your Windows Chrome installation and use the headless mode:

1.  **Set the `CHROME_BIN` environment variable:**
    ```bash
    export CHROME_BIN="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"
    ```
2.  **Run all tests in CI mode:**
    ```bash
    npm run test:ci
    ```

---

### Running Functional Tests (E2E)

Functional tests are implemented using Playwright and are located in the `tests/` directory.

#### **Run E2E Tests**
```bash
npm run test:e2e
```

---

### Default Credentials
To access the dashboard, use the following credentials:
*   **Email:** `test@example.com`
*   **Password:** `password123`

### Programmatic State Reset
You can reset the application state to a specific profile at any time by sending a POST request to the mock server:

```bash
curl -X POST http://localhost:3001/api/state/reset -H "Content-Type: application/json" -d '{"profile": "default"}'
```
Available profiles: `default`, `empty_state`, `error_state`.