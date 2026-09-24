import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { authenticate, authorize } from '../core/auth.middleware';
import { UserRole } from '../models/types';

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

app.post('/api/v1/auth/login', (req: Request, res: Response) => {
  const { email } = req.body;
  res.json({ 
    token: 'mock_jwt_token_for_' + email, 
    user: { email, role: 'customer' } 
  });
});

app.get('/api/v1/me', authenticate, (req: any, res: Response) => {
  res.json({ user: req.user });
});

app.get('/api/v1/admin/dashboard', authenticate, authorize([UserRole.PLATFORM_ADMIN]), (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Platform Admin Dashboard' });
});

app.get('/api/v1/supplier/portal', authenticate, authorize([UserRole.SUPPLIER_ADMIN]), (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Supplier Portal' });
});

app.get('/api/v1/analytics', authenticate, (req: Request, res: Response) => {
  res.json({ message: 'Environmental Analytics API - Phase 6 Placeholder' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Merciport Backend running on port ${PORT}`);
});
