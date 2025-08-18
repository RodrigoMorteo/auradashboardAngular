# AuraDash (Angular Edition)

Welcome to AuraDash, a modern System Under Test (SUT) meticulously designed to validate the capabilities of contemporary test automation frameworks.

This application is not a commercial product but a testing crucible. Each feature is deliberately chosen to probe the limits of automation tools and promote best practices in test script development, moving beyond legacy test apps. It is built on a modern Angular, Tailwind CSS, and Lit stack to provide a rich and challenging surface for test automation.


***

### Core Tenets

* **Challenging by Design:** Features like Shadow DOM, interactive SVG charts, infinite scroll, and drag-and-drop are included specifically to test a framework's resilience against common automation pain points.
* **Built for Testability:** The most important feature is the mock backend's programmatic state control. A dedicated API endpoint (`/api/state/reset`) allows tests to set the application's state to a known baseline, enabling idempotent and non-flaky test runs.
* **Deployment Simplicity:** The entire application can be launched with a single Docker command, eliminating environment-specific setup issues and providing a consistent testing target for any engineer on any machine.

### Technology Stack

| Technology         | Role in AuraDash                                               | Primary Testing Challenge                                                    |
| ------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Angular** | Core SPA Framework                                             | Component lifecycle, dependency injection, change detection, Signals reactivity. |
| **Angular Router** | Client-Side Routing                                            | Validating route guards, page transitions, and state preservation across views.  |
| **Angular Signals**| State Management                                               | Testing component reactions to global state changes from a centralized service.    |
| **Tailwind CSS** | Utility-First Styling                                          | Locator strategy robustness (moving beyond class names), responsive layout validation. |
| **Lit** | Encapsulated Widget (User Profile)                             | Shadow DOM traversal, testing interactions with isolated components.          |
| **ngx-charts** | Data Visualization                                             | Interacting with and asserting on non-HTML elements (SVG), handling dynamic tooltips. |
| **Node.js/Express**| Mock API & Data Source                                         | Mocking network requests, testing loading states, error handling, and data seeding. |
| **Docker** | Containerization                                               | Ensuring a consistent, one-command deployment for all users.                  |

***

### Getting Started

You can run AuraDash in two ways: locally using Node.js or via Docker. Docker is the recommended method for the most consistent experience.

#### **Prerequisites**
* Node.js v18 or later
* npm v9 or later
* Docker and Docker Compose (for containerized setup)

---

#### **Option 1: Running with Docker (Recommended)**

This is the simplest and most reliable way to run AuraDash.

1.  **Clone the repository.**
2.  **Navigate to the root directory `auradash`.**
3.  **Run the application:**
    ```bash
    docker-compose up
    ```
4.  Wait for the containers to build and the services to start.
5.  **Open your browser and navigate to `http://localhost`**.

The application will be running with the Angular frontend communicating with the mock backend.

---

#### **Option 2: Running Locally**

This requires running the mock server and the Angular development server in separate terminals.

**Terminal 1: Start the Mock Backend**

```bash
# Navigate to the mock server directory
cd mock-server

# Install dependencies
npm install

# Start the server
npm start
```

Now start the UI:
```bash
# Move back one folder
cd ..

# Navigate to the Angular application directory
cd app

# Install dependencies
npm install

# Start the Angular development server
npm start
```