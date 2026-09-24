import { Request, Response } from 'express';
import { TransactionRepository } from '../../repositories/transaction.repository';
import { CarbonRepository } from '../../repositories/carbon.repository';
import { analyticsService } from '../../services/analytics.service';

export class TransactionController {
  static async create(req: any, res: Response) {
    try {
      const { serviceId, quantity, totalAmount } = req.body;
      const customerId = req.user.id;

      // 1. Create the Transaction record
      const transaction = await TransactionRepository.create({
        customerId,
        serviceId,
        quantity,
        totalAmount,
        status: 'completed'
      });

      // 2. Trigger Analytics Engine to calculate carbon savings
      const impactRecord = analyticsService.createImpactRecord(transaction);

      // 3. Save the Carbon Log to the database
      await CarbonRepository.create(impactRecord);

      res.status(201).json({
        message: 'Transaction completed and carbon impact recorded',
        transaction,
        impact: impactRecord
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to process transaction' });
    }
  }

  static async getMyImpact(req: any, res: Response) {
    try {
      const customerId = req.user.id;
      const logs = await CarbonRepository.findByCustomerId(customerId);
      const total = analyticsService.aggregateTotalImpact(logs);

      res.json({
        totalCarbonSaved: total.totalSaved,
        unit: 'tonnes CO2e',
        transactionCount: total.count,
        history: logs
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve impact data' });
    }
  }
}
