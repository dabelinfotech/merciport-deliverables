import { Request, Response } from 'express';
import { SupplierRepository } from '../../repositories/supplier.repository';

export class SupplierController {
  static async getAll(req: Request, res: Response) {
    const suppliers = await SupplierRepository.findAll();
    res.json(suppliers);
  }

  static async create(req: Request, res: Response) {
    const supplier = await SupplierRepository.create(req.body);
    res.status(201).json(supplier);
  }
}
