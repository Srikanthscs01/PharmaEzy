
import express from 'express';
import * as productController from '../controllers/productController';

const router = express.Router();

// GET all products
router.get('/', productController.getAllProducts);

// GET product by ID
router.get('/id/:id', productController.getProductById);

// GET product by code
router.get('/code/:code', productController.getProductByCode);

// GET search products
router.get('/search', productController.searchProducts);

// POST create new product
router.post('/', productController.createProduct);

// PUT update product
router.put('/:id', productController.updateProduct);

// DELETE product
router.delete('/:id', productController.deleteProduct);

export default router;
