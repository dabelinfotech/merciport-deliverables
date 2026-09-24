-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TYPE user_role AS ENUM ('customer', 'supplier_admin', 'platform_admin');
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role user_role NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Suppliers Table
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    status verification_status DEFAULT 'pending',
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    supplier_id UUID REFERENCES suppliers(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    unit_price DECIMAL(12,2),
    carbon_offset_per_unit DECIMAL(12,4) NOT NULL,
    is_active BOOLEAN DEFAULT true
);

-- Transactions Table
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'cancelled');
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES users(id),
    service_id UUID REFERENCES services(id),
    quantity DECIMAL(12,2) NOT NULL,
    total_amount DECIMAL(12,2),
    status transaction_status DEFAULT 'pending',
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Carbon Logs Table
CREATE TABLE carbon_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
    carbon_saved DECIMAL(12,4) NOT NULL,
    calculation_method VARCHAR(100),
    verified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_transactions_customer ON transactions(customer_id);
CREATE INDEX idx_carbon_logs_transaction ON carbon_logs(transaction_id);
