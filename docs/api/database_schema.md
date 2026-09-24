# Merciport Platform - Database Schema Design
**Version:** 0.1 (Draft)
**Engine:** PostgreSQL

## 1. Entity Relationship Diagram (ERD) Logic
The system revolves around the relationship between **Users**, **Suppliers**, and **Environmental Impacts**.

### 1.1 Core Tables

#### `users`
Stores all identities (Customers, Supplier Admins, Platform Admins).
- `id`: UUID (PK)
- `email`: VARCHAR(255) (Unique)
- `password_hash`: TEXT
- `role`: ENUM ('customer', 'supplier_admin', 'platform_admin')
- `full_name`: VARCHAR(255)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

#### `suppliers`
Profiles for service providers.
- `id`: UUID (PK)
- `owner_id`: UUID (FK -> users.id)
- `business_name`: VARCHAR(255)
- `category`: VARCHAR(100) (e.g., 'Renewable Energy', 'Waste Mgmt')
- `verification_status`: ENUM ('pending', 'verified', 'rejected')
- `location`: GEOMETRY(Point) or VARCHAR(255)
- `created_at`: TIMESTAMP

#### `services`
The actual offerings provided by suppliers.
- `id`: UUID (PK)
- `supplier_id`: UUID (FK -> suppliers.id)
- `name`: VARCHAR(255)
- `description`: TEXT
- `unit_price`: DECIMAL
- `carbon_offset_per_unit`: DECIMAL (The key metric for analytics)
- `is_active`: BOOLEAN

#### `transactions`
Records of customer engagement with suppliers.
- `id`: UUID (PK)
- `customer_id`: UUID (FK -> users.id)
- `service_id`: UUID (FK -> services.id)
- `quantity`: DECIMAL
- `total_amount`: DECIMAL
- `status`: ENUM ('pending', 'completed', 'cancelled')
- `transaction_date`: TIMESTAMP

#### `carbon_logs`
The ledger for the Carbon & Clean Energy Analytics Centre.
- `id`: UUID (PK)
- `transaction_id`: UUID (FK -> transactions.id)
- `carbon_saved`: DECIMAL
- `calculation_method`: VARCHAR(100) (Refers to the methodology in SRS)
- `verified_at`: TIMESTAMP

## 2. Key Relationships
- **User $\rightarrow$ Supplier:** 1:1 (A supplier admin owns one supplier profile).
- **Supplier $\rightarrow$ Service:** 1:N (One supplier offers many services).
- **User (Customer) $\rightarrow$ Transaction:** 1:N (Customer makes many purchases).
- **Service $\rightarrow$ Transaction:** 1:N (One service is sold many times).
- **Transaction $\rightarrow$ CarbonLog:** 1:1 (Each completed transaction generates an impact record).

## 3. Indexing Strategy
- `users(email)`: B-Tree for fast login.
- `suppliers(verification_status)`: For admin filtering.
- `transactions(customer_id, transaction_date)`: For customer history views.
- `carbon_logs(transaction_date)`: For time-series analytics reporting.
