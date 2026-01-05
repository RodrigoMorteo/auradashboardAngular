# Specification: Investigate and Resolve SSR Stability Issues

## Context
The application is experiencing `NG0401: Missing Platform SSR` errors during Server-Side Rendering. A previous analysis suggests this is due to browser-specific libraries (Chart.js, Lit, ngx-toastr) executing in the Node.js environment. However, this hypothesis needs rigorous verification.

## Goals
1.  **Reproduce:** Reliably reproduce the SSR crash and capture detailed error logs.
2.  **Verify:** Confirm if the crash is indeed caused by the suspected libraries or an alternative source.
3.  **Fix:** Implement architectural changes to ensure browser-only code is never executed on the server.
4.  **Stabilize:** Ensure the application builds and serves successfully in SSR mode.

## Constraints
-   Must maintain existing functionality (charts, web components).
-   Must use Angular's standard APIs for platform detection (`isPlatformBrowser`, `afterNextRender`, `@defer`).
