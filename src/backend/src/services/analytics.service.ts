import { Transaction, CarbonLog } from '../models/types';

export interface CarbonCalculationParams {
  serviceId: string;
  quantity: number;
  methodology: string;
}

export class AnalyticsService {
  /**
   * Calculates carbon savings based on a specific methodology.
   * In a real scenario, this would pull coefficients from a verified 
   * environmental database or the SRS specification.
   */
  calculateCarbonSavings(params: CarbonCalculationParams): number {
    // Mock Coefficients: Carbon saved per unit based on service type
    // These would normally be stored in the 'services' table in the DB
    const coefficients: Record<string, number> = {
      'renewable_energy_install': 1.2, // tonnes of CO2 per unit
      'waste_diversion': 0.45,
      'electric_vehicle_conv': 2.1,
      'default': 0.1
    };

    // Use the coefficient based on serviceId (simulated) or default
    const coefficient = coefficients[params.serviceId] || coefficients['default'];
    
    return params.quantity * coefficient;
  }

  /**
   * Generates a carbon log entry for a completed transaction.
   */
  createImpactRecord(transaction: Transaction): CarbonLog {
    const savings = this.calculateCarbonSavings({
      serviceId: transaction.serviceId,
      quantity: transaction.quantity,
      methodology: 'Merciport-Standard-v1'
    });

    return {
      id: `log_${Math.random().toString(36).substr(2, 9)}`,
      transactionId: transaction.id,
      carbonSaved: savings,
      calculationMethod: 'Merciport-Standard-v1'
    };
  }

  /**
   * Aggregates total impact for a user (Customer or Supplier)
   */
  aggregateTotalImpact(logs: CarbonLog[]): { totalSaved: number; count: number } {
    return logs.reduce((acc, log) => ({
      totalSaved: acc.totalSaved + log.carbonSaved,
      count: acc.count + 1
    }), { totalSaved: 0, count: 0 });
  }
}

export const analyticsService = new AnalyticsService();
