import { query } from '../core/db';
import { User, UserRole } from '../models/types';

export class UserRepository {
  static async findByEmail(email: string): Promise<User | null> {
    const res = await query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0] || null;
  }

  static async create(user: Partial<User>): Promise<User> {
    const res = await query(
      'INSERT INTO users (email, password_hash, role, full_name) VALUES ($1, $2, $3, $4) RETURNING *',
      [user.email, user.password_hash, user.role, user.fullName]
    );
    return res.rows[0];
  }
}
