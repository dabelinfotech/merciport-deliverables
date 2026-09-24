# Software Requirements Specification (SRS) - Merciport Platform
**Version:** 0.1 (Draft)
**Date:** 2026-09-24

## 1. Introduction
The Merciport Platform is an ecosystem designed to connect customers and suppliers while tracking environmental impact through a Carbon & Clean Energy Analytics Centre.

## 2. System Overview
The platform consists of four primary surfaces:
1. **Customer Mobile App:** (iOS/Android) For end-users to discover suppliers and track their carbon footprint.
2. **Supplier Portal/App:** For service providers to manage their catalogs, bookings, and impact data.
3. **Admin Dashboard:** For Merciport operators to manage users, roles, and platform configuration.
4. **Backend API:** The core engine handling authentication, data orchestration, and analytics.

## 3. Functional Requirements

### 3.1 Customer Mobile App
- **C1: Onboarding** - User registration, profile setup, and preference management.
- **C2: Discovery** - Search and filter for verified suppliers.
- **C3: Transaction Management** - Booking services and payment processing.
- **C4: Environmental Impact View** - Real-time visualization of carbon savings/impact.

### 3.2 Supplier Portal
- **S1: Catalog Management** - Create, edit, and delete services/products.
- **S2: Order Fulfillment** - Manage incoming requests and booking status.
- **S3: Impact Reporting** - Submit data for carbon analytics calculation.

### 3.3 Admin Dashboard
- **A1: User Management** - Role-based access control (RBAC) for all users.
- **A2: Supplier Verification** - Vetting and approving new suppliers.
- **A3: Platform Analytics** - High-level reporting on total platform carbon impact.

### 3.4 Backend API & Analytics
- **B1: Auth Service** - Secure JWT-based authentication and authorization.
- **B2: Analytics Engine** - Calculate carbon impact based on supplier data and industry standards.
- **B3: Reporting Engine** - Generate exportable PDFs/CSVs for partners and investors.

## 4. Non-Functional Requirements
- **Security:** AES-256 encryption for sensitive data; SSL/TLS for all transit.
- **Scalability:** Architecture must support horizontal scaling of API nodes.
- **Accessibility:** UI/UX must target WCAG 2.1 AA compliance.
- **Availability:** 99.9% uptime target for the Backend API.

## 5. Traceability Matrix (Draft)
| Req ID | Surface | Deliverable | Phase |
|---------|---------|-------------|-------|
| C1-C4   | Mobile  | Customer App| Phase 3 |
| S1-S3   | Portal  | Supplier App| Phase 4 |
| A1-A3   | Admin   | Admin Dash  | Phase 5 |
| B1-B3   | API     | Backend API | Phase 2 |
