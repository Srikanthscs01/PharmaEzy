
import { Request, Response } from 'express';
import * as db from '../services/database';

export const getAllPurchases = (req: Request, res: Response) => {
  try {
    const purchases = db.getAllPurchases();
    res.status(200).json(purchases);
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ message: 'Failed to fetch purchases' });
  }
};

export const getPurchaseById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const purchase = db.getPurchaseById(id);
    
    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }
    
    res.status(200).json(purchase);
  } catch (error) {
    console.error('Error fetching purchase:', error);
    res.status(500).json({ message: 'Failed to fetch purchase' });
  }
};

export const createPurchase = (req: Request, res: Response) => {
  try {
    const purchase = req.body;
    
    // Validate required fields
    if (!purchase.supplier || !purchase.items || !Array.isArray(purchase.items) || purchase.items.length === 0) {
      return res.status(400).json({ message: 'Supplier and at least one item are required' });
    }
    
    // Simple validation for items
    for (const item of purchase.items) {
      if (!item.code || !item.productName || !item.qty) {
        return res.status(400).json({ message: 'Each item must have code, product name, and quantity' });
      }
    }
    
    const newPurchase = db.createPurchase(purchase);
    
    // Update inventory (add quantities)
    purchase.items.forEach(item => {
      // Check if product exists
      const product = db.getProductByCode(item.code);
      if (!product) {
        // Create a new product if it doesn't exist
        db.createProduct({
          code: item.code,
          name: item.productName,
          packing: item.packing
        });
      }
      
      // Check if batch exists
      const batches = db.getBatchesByProductCode(item.code);
      const existingBatch = batches.find(b => b.batchNo === item.batchNo);
      
      if (existingBatch) {
        // Update existing batch
        db.updateBatch(existingBatch.id!, {
          qty: existingBatch.qty + item.qty,
          billPrice: item.rate,
          updatedAt: new Date()
        });
      } else {
        // Create new batch
        db.createBatch({
          productCode: item.code,
          batchNo: item.batchNo,
          billPrice: item.rate,
          mrp: item.rate * 1.2, // Estimate MRP
          expiry: `${item.month}/${item.year}`,
          qty: item.qty,
          qit: 0,
          purNo: purchase.invoiceNo,
          purDate: purchase.date,
          rcvdDate: purchase.entryDate,
          from: purchase.supplier,
          supplier: purchase.supplier
        });
      }
    });
    
    res.status(201).json(newPurchase);
  } catch (error) {
    console.error('Error creating purchase:', error);
    res.status(500).json({ message: 'Failed to create purchase' });
  }
};

export const updatePurchase = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const purchase = req.body;
    
    const existingPurchase = db.getPurchaseById(id);
    if (!existingPurchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }
    
    const updatedPurchase = db.updatePurchase(id, purchase);
    
    res.status(200).json(updatedPurchase);
  } catch (error) {
    console.error('Error updating purchase:', error);
    res.status(500).json({ message: 'Failed to update purchase' });
  }
};

export const deletePurchase = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Get purchase before deletion to update inventory
    const purchase = db.getPurchaseById(id);
    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }
    
    const deleted = db.deletePurchase(id);
    
    if (deleted) {
      // Update inventory (subtract quantities)
      purchase.items.forEach(item => {
        const batches = db.getBatchesByProductCode(item.code);
        const batch = batches.find(b => b.batchNo === item.batchNo);
        
        if (batch) {
          // Reduce quantity
          db.updateBatch(batch.id!, {
            qty: Math.max(0, batch.qty - item.qty)
          });
        }
      });
      
      res.status(200).json({ message: 'Purchase deleted successfully' });
    } else {
      res.status(404).json({ message: 'Purchase not found' });
    }
  } catch (error) {
    console.error('Error deleting purchase:', error);
    res.status(500).json({ message: 'Failed to delete purchase' });
  }
};
