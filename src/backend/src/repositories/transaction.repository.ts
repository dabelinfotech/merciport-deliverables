import { query } from '../core/db';
import { Transaction } from '../models/types';

export class TransactionRepository {
  static async create(transaction: Partial<Transaction>): Promise<Transaction> {
    const res = await query(
      'INSERT INTO transactions (customer_id, service_id, quantity, total_amount, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [transaction.customerId, transaction.serviceId, transaction.quantity, transaction.totalAmount, transaction.status]
    );
    return res.rows[0];
  }

  static async findByCustomerId(customerId: string): Promise<Transaction[]> {
    const res = await query('SELECT * FROM transactions WHERE customer_id = $1', [customerId]);
    return res.rows;
  }
}
