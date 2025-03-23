
import express from 'express';
import * as purchaseController from '../controllers/purchaseController';

const router = express.Router();

// GET all purchases
router.get('/', purchaseController.getAllPurchases);

// GET purchase by ID
router.get('/:id', purchaseController.getPurchaseById);

// POST create new purchase
router.post('/', purchaseController.createPurchase);

// PUT update purchase
router.put('/:id', purchaseController.updatePurchase);

// DELETE purchase
router.delete('/:id', purchaseController.deletePurchase);

export default router;
