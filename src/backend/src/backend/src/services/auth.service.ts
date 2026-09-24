import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User, UserRole } from '../models/types';

const JWT_SECRET = process.env.JWT_SECRET || 'merciport_super_secret_key_2026';

export class AuthService {
  // Mock database for now - will be replaced by Postgres
  private users: User[] = [];

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  generateToken(user: User): string {
    return jwt.sign(
      { id: user.id, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );
  }

  verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
  }
}

export const authService = new AuthService();
