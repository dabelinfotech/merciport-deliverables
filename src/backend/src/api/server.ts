import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { authenticate, authorize } from '../core/auth.middleware';
import { UserRole } from '../models/types';
import { AnalyticsController } from './controllers/analytics.controller';
import { AuthController } from './controllers/auth.controller';
import { SupplierController } from './controllers/supplier.controller';
import { TransactionController } from './controllers/transaction.controller';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// AUTH ROUTES
app.post('/api/v1/auth/register', AuthController.register);
app.post('/api/v1/auth/login', AuthController.login);

// USER ROUTES
app.get('/api/v1/me', authenticate, (req: any, res: Response) => {
  res.json({ user: req.user });
});

// TRANSACTION & IMPACT ROUTES
app.post('/api/v1/transactions', authenticate, TransactionController.create);
app.get('/api/v1/analytics/impact', authenticate, TransactionController.getMyImpact);

// SUPPLIER ROUTES
app.get('/api/v1/suppliers', authenticate, SupplierController.getAll);
app.post('/api/v1/suppliers', authenticate, authorize([UserRole.SUPPLIER_ADMIN, UserRole.PLATFORM_ADMIN]), SupplierController.create);

// ADMIN ROUTES
app.get('/api/v1/admin/dashboard', authenticate, authorize([UserRole.PLATFORM_ADMIN]), (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Platform Admin Dashboard' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Merciport Backend running on port ${PORT}`);
});
