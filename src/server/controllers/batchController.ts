
import { Request, Response } from 'express';
import * as db from '../services/database';

export const getAllBatches = async (req: Request, res: Response) => {
  try {
    const batches = await db.getAllBatches();
    res.status(200).json(batches);
  } catch (error) {
    console.error('Error fetching batches:', error);
    res.status(500).json({ message: 'Failed to fetch batches' });
  }
};

export const getBatchById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const batch = await db.getBatchById(id);
    
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }
    
    res.status(200).json(batch);
  } catch (error) {
    console.error('Error fetching batch:', error);
    res.status(500).json({ message: 'Failed to fetch batch' });
  }
};

export const getBatchesByProductCode = async (req: Request, res: Response) => {
  try {
    const { productCode } = req.params;
    const batches = await db.getBatchesByProductCode(productCode);
    
    res.status(200).json(batches);
  } catch (error) {
    console.error('Error fetching batches by product code:', error);
    res.status(500).json({ message: 'Failed to fetch batches' });
  }
};

export const createBatch = async (req: Request, res: Response) => {
  try {
    const batch = req.body;
    
    // Validate required fields
    if (!batch.productCode || !batch.batchNo) {
      return res.status(400).json({ message: 'Product code and batch number are required' });
    }
    
    // Check if product exists
    const product = await db.getProductByCode(batch.productCode);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const newBatch = await db.createBatch(batch);
    res.status(201).json(newBatch);
  } catch (error) {
    console.error('Error creating batch:', error);
    res.status(500).json({ message: 'Failed to create batch' });
  }
};

export const updateBatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const batch = req.body;
    
    const updatedBatch = await db.updateBatch(id, batch);
    
    if (!updatedBatch) {
      return res.status(404).json({ message: 'Batch not found' });
    }
    
    res.status(200).json(updatedBatch);
  } catch (error) {
    console.error('Error updating batch:', error);
    res.status(500).json({ message: 'Failed to update batch' });
  }
};

export const deleteBatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await db.deleteBatch(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Batch not found' });
    }
    
    res.status(200).json({ message: 'Batch deleted successfully' });
  } catch (error) {
    console.error('Error deleting batch:', error);
    res.status(500).json({ message: 'Failed to delete batch' });
  }
};
