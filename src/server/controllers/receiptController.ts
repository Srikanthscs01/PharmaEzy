
import { Request, Response } from 'express';
import * as db from '../services/database';

export const getAllReceipts = (req: Request, res: Response) => {
  try {
    const receipts = db.getAllReceipts();
    res.status(200).json(receipts);
  } catch (error) {
    console.error('Error fetching receipts:', error);
    res.status(500).json({ message: 'Failed to fetch receipts' });
  }
};

export const getReceiptById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const receipt = db.getReceiptById(id);
    
    if (!receipt) {
      return res.status(404).json({ message: 'Receipt not found' });
    }
    
    res.status(200).json(receipt);
  } catch (error) {
    console.error('Error fetching receipt:', error);
    res.status(500).json({ message: 'Failed to fetch receipt' });
  }
};

export const createReceipt = (req: Request, res: Response) => {
  try {
    const receipt = req.body;
    
    // Validate required fields
    if (!receipt.customer || !receipt.receiptNumber || !receipt.date) {
      return res.status(400).json({ 
        message: 'Customer, receipt number and date are required' 
      });
    }
    
    // Validate bills if present
    if (receipt.bills && (!Array.isArray(receipt.bills) || receipt.bills.length === 0)) {
      return res.status(400).json({ message: 'Bills must be a non-empty array' });
    }
    
    const newReceipt = db.createReceipt(receipt);
    res.status(201).json(newReceipt);
  } catch (error) {
    console.error('Error creating receipt:', error);
    res.status(500).json({ message: 'Failed to create receipt' });
  }
};

export const updateReceipt = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const receipt = req.body;
    
    const updatedReceipt = db.updateReceipt(id, receipt);
    
    if (!updatedReceipt) {
      return res.status(404).json({ message: 'Receipt not found' });
    }
    
    res.status(200).json(updatedReceipt);
  } catch (error) {
    console.error('Error updating receipt:', error);
    res.status(500).json({ message: 'Failed to update receipt' });
  }
};

export const deleteReceipt = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteReceipt(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Receipt not found' });
    }
    
    res.status(200).json({ message: 'Receipt deleted successfully' });
  } catch (error) {
    console.error('Error deleting receipt:', error);
    res.status(500).json({ message: 'Failed to delete receipt' });
  }
};
