
import express from 'express';
import * as salesController from '../controllers/salesController';

const router = express.Router();

// GET all sales
router.get('/', salesController.getAllSales);

// GET sale by ID
router.get('/:id', salesController.getSaleById);

// POST create new sale
router.post('/', salesController.createSale);

// PUT update sale
router.put('/:id', salesController.updateSale);

// DELETE sale
router.delete('/:id', salesController.deleteSale);

export default router;
