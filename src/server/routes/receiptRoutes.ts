
import express from 'express';
import * as receiptController from '../controllers/receiptController';

const router = express.Router();

// GET all receipts
router.get('/', receiptController.getAllReceipts);

// GET receipt by ID
router.get('/:id', receiptController.getReceiptById);

// POST create new receipt
router.post('/', receiptController.createReceipt);

// PUT update receipt
router.put('/:id', receiptController.updateReceipt);

// DELETE receipt
router.delete('/:id', receiptController.deleteReceipt);

export default router;
