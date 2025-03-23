
import { Request, Response } from 'express';
import * as db from '../services/database';

export const getAllSales = async (req: Request, res: Response) => {
  try {
    const sales = await db.getAllSales();
    res.status(200).json(sales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ message: 'Failed to fetch sales' });
  }
};

export const getSaleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sale = await db.getSaleById(id);
    
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    
    res.status(200).json(sale);
  } catch (error) {
    console.error('Error fetching sale:', error);
    res.status(500).json({ message: 'Failed to fetch sale' });
  }
};

export const createSale = async (req: Request, res: Response) => {
  try {
    const sale = req.body;
    
    // Validate required fields
    if (!sale.customer || !sale.items || !Array.isArray(sale.items) || sale.items.length === 0) {
      return res.status(400).json({ message: 'Customer and at least one item are required' });
    }
    
    // Simple validation for items
    for (const item of sale.items) {
      if (!item.code || !item.productName || !item.qty) {
        return res.status(400).json({ message: 'Each item must have code, product name, and quantity' });
      }
    }
    
    const newSale = await db.createSale(sale);
    
    // Update inventory (reduce quantities) - this would be handled by a transaction in a real app
    for (const item of sale.items) {
      const batches = await db.getBatchesByProductCode(item.code);
      if (batches.length > 0) {
        const batch = batches.find(b => b.batchNo === item.batch) || batches[0];
        if (batch) {
          await db.updateBatch(batch.id!, {
            qty: Math.max(0, batch.qty - item.qty)
          });
        }
      }
    }
    
    res.status(201).json(newSale);
  } catch (error) {
    console.error('Error creating sale:', error);
    res.status(500).json({ message: 'Failed to create sale' });
  }
};

export const updateSale = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sale = req.body;
    
    const existingSale = await db.getSaleById(id);
    if (!existingSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    
    const updatedSale = await db.updateSale(id, sale);
    
    res.status(200).json(updatedSale);
  } catch (error) {
    console.error('Error updating sale:', error);
    res.status(500).json({ message: 'Failed to update sale' });
  }
};

export const deleteSale = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Get sale before deletion to restore inventory
    const sale = await db.getSaleById(id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    
    const deleted = await db.deleteSale(id);
    
    if (deleted) {
      // Restore inventory (add quantities back)
      for (const item of sale.items) {
        const batches = await db.getBatchesByProductCode(item.code);
        if (batches.length > 0) {
          const batch = batches.find(b => b.batchNo === item.batch) || batches[0];
          if (batch) {
            await db.updateBatch(batch.id!, {
              qty: batch.qty + item.qty
            });
          }
        }
      }
      
      res.status(200).json({ message: 'Sale deleted successfully' });
    } else {
      res.status(404).json({ message: 'Sale not found' });
    }
  } catch (error) {
    console.error('Error deleting sale:', error);
    res.status(500).json({ message: 'Failed to delete sale' });
  }
};
