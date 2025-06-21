
import { Request, Response } from 'express';
import * as db from '../services/database';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await db.getProductById(parseInt(id));
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

export const getProductWithBatches = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await db.getProductById(parseInt(id));
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const batches = await db.getBatchesByProductId(parseInt(id));
    
    res.status(200).json({
      product,
      batches
    });
  } catch (error) {
    console.error('Error fetching product with batches:', error);
    res.status(500).json({ message: 'Failed to fetch product with batches' });
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const products = await db.searchProducts(query);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ message: 'Failed to search products' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    
    // Validate required fields
    if (!product.Name) {
      return res.status(400).json({ message: 'Product name is required' });
    }
    
    const newProduct = await db.createProduct(product);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = req.body;
    
    const updatedProduct = await db.updateProduct(parseInt(id), product);
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await db.deleteProduct(parseInt(id));
    
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
};
