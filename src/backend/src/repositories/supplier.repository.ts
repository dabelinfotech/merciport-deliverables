import { query } from '../core/db';
import { Supplier } from '../models/types';

export class SupplierRepository {
  static async findAll(): Promise<Supplier[]> {
    const res = await query('SELECT * FROM suppliers');
    return res.rows;
  }

  static async findById(id: string): Promise<Supplier | null> {
    const res = await query('SELECT * FROM suppliers WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  static async create(supplier: Partial<Supplier>): Promise<Supplier> {
    const res = await query(
      'INSERT INTO suppliers (owner_id, business_name, category, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [supplier.ownerId, supplier.businessName, supplier.category, supplier.status]
    );
    return res.rows[0];
  }
}
