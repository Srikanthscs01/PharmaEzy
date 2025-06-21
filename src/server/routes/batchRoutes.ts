
import express from 'express';
import * as batchController from '../controllers/batchController';

const router = express.Router();

// GET all batches
router.get('/', batchController.getAllBatches);

// GET batch by ID
router.get('/:id', batchController.getBatchById);

// GET batches by product ID
router.get('/product/:productId', batchController.getBatchesByProductId);

// POST create new batch
router.post('/', batchController.createBatch);

// PUT update batch
router.put('/:id', batchController.updateBatch);

// DELETE batch
router.delete('/:id', batchController.deleteBatch);

export default router;
