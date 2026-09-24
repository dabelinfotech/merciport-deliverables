import { query } from '../core/db';
import { CarbonLog } from '../models/types';

export class CarbonRepository {
  static async create(log: Partial<CarbonLog>): Promise<CarbonLog> {
    const res = await query(
      'INSERT INTO carbon_logs (transaction_id, carbon_saved, calculation_method) VALUES ($1, $2, $3) RETURNING *',
      [log.transactionId, log.carbonSaved, log.calculationMethod]
    );
    return res.rows[0];
  }
  static async findByCustomerId(customerId: string): Promise<CarbonLog[]> {
    const res = await query(
      'SELECT cl.* FROM carbon_logs cl JOIN transactions t ON cl.transaction_id = t.id WHERE t.customer_id = $1',
      [customerId]
    );
    return res.rows;
  }
}
