import { Request, Response } from 'express';
import { analyticsService } from '../../services/analytics.service';

export class AnalyticsController {
  static async getUserImpact(req: Request, res: Response) {
    try {
      // Mocking some logs for a user to demonstrate the calculation
      const mockLogs = [
        { id: '1', transactionId: 't1', carbonSaved: 1.2, calculationMethod: 'v1' },
        { id: '2', transactionId: 't2', carbonSaved: 0.45, calculationMethod: 'v1' },
      ];

      const total = analyticsService.aggregateTotalImpact(mockLogs);
      
      res.json({
        userId: (req as any).user?.id,
        totalCarbonSaved: total.totalSaved,
        unit: 'tonnes CO2e',
        transactionCount: total.count,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to calculate impact' });
    }
  }
}
