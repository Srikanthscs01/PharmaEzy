
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
    const product = await db.getProductById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

export const getProductByCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const product = await db.getProductByCode(code);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by code:', error);
    res.status(500).json({ message: 'Failed to fetch product' });
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
    if (!product.code || !product.name) {
      return res.status(400).json({ message: 'Product code and name are required' });
    }
    
    // Check if product with this code already exists
    const existingProduct = await db.getProductByCode(product.code);
    if (existingProduct) {
      return res.status(409).json({ message: 'Product with this code already exists' });
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
    
    const updatedProduct = await db.updateProduct(id, product);
    
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
    const deleted = await db.deleteProduct(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
};
