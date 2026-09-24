# Merciport Platform - Master Test Plan
**Version:** 1.0 | **Status:** Draft

## 1. Testing Objectives
The goal is to ensure the platform is secure, the carbon calculations are accurate, and the user journeys across all three surfaces are seamless.

## 2. Testing Scope
### 2.1 Functional Testing
- **Customer App:** Registration $\rightarrow$ Discovery $\rightarrow$ Booking $\rightarrow$ Impact View.
- **Supplier Portal:** Service creation $\rightarrow$ Order tracking $\rightarrow$ Impact view.
- **Admin Dashboard:** Supplier verification $\rightarrow$ Global stats monitoring.
- **Backend API:** Auth validation, RBAC enforcement, and Analytics accuracy.

### 2.2 Non-Functional Testing
- **Security:** JWT token expiration, role-based access leakage.
- **Performance:** API response times under load for analytics aggregation.
- **Usability:** Accessibility (WCAG 2.1 AA) on mobile and web.

## 3. Test Environment
- **Staging:** Mirrored production environment with a sanitized dataset.
- **Devices:** iOS (iPhone 13+), Android (Samsung S21+), Chrome/Safari (Latest).

## 4. Exit Criteria
- 100% of Critical and High priority test cases passed.
- No open "Blocker" or "Critical" defects.
- UAT sign-off from Merciport stakeholders for each surface.
