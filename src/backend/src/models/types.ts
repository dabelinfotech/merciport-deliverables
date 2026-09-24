export enum UserRole {
  CUSTOMER = 'customer',
  SUPPLIER_ADMIN = 'supplier_admin',
  PLATFORM_ADMIN = 'platform_admin'
}

export enum VerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  createdAt: Date;
}

export interface Supplier {
  id: string;
  ownerId: string;
  businessName: string;
  category: string;
  status: VerificationStatus;
}

export interface Service {
  id: string;
  supplierId: string;
  name: string;
  carbonOffsetPerUnit: number;
}

export interface Transaction {
  id: string;
  customerId: string;
  serviceId: string;
  quantity: number;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface CarbonLog {
  id: string;
  transactionId: string;
  carbonSaved: number;
  calculationMethod: string;
}
