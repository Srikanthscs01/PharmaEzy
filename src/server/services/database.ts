
import { Product } from '../models/Product';
import { Batch } from '../models/Batch';
import { Sale } from '../models/Sale';
import { Purchase } from '../models/Purchase';
import { Receipt } from '../models/Receipt';
import { v4 as uuidv4 } from 'uuid';

// In-memory database simulation
let products: Product[] = [];
let batches: Batch[] = [];
let sales: Sale[] = [];
let purchases: Purchase[] = [];
let receipts: Receipt[] = [];

// Import initial data from mockData
import { getProducts } from '../../lib/mockData';

// Initialize with mock data
const initializeDb = () => {
  const mockProducts = getProducts();
  
  mockProducts.forEach(mockProduct => {
    // Add product
    const product: Product = {
      id: uuidv4(),
      code: mockProduct.code,
      name: mockProduct.name,
      rackNo: mockProduct.rack,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    products.push(product);
    
    // Add batches
    mockProduct.batches.forEach(mockBatch => {
      const batch: Batch = {
        id: uuidv4(),
        productCode: mockProduct.code,
        batchNo: mockBatch.batchNo,
        billPrice: mockBatch.billPrice,
        mrp: mockBatch.mrp,
        expiry: mockBatch.expiry,
        qty: mockBatch.qty,
        qit: mockBatch.qit,
        purNo: mockBatch.purNo || '',
        purDate: mockBatch.purDate || '',
        rcvdDate: mockBatch.rcvdDate || '',
        from: mockBatch.from || '',
        barCode: mockBatch.barCode,
        purPrice: mockBatch.purPrice,
        scheme: mockBatch.scheme,
        schemePct: mockBatch.schemePct,
        schAmt: mockBatch.schAmt,
        disPct: mockBatch.disPct,
        addDisPct: mockBatch.addDisPct,
        gstPct: mockBatch.gstPct,
        specialPrice: mockBatch.specialPrice,
        stockistPrice: mockBatch.stockistPrice,
        costPrice: mockBatch.costPrice,
        acPrice: mockBatch.acPrice,
        retailerMarginPct: mockBatch.retailerMarginPct,
        marginPct: mockBatch.marginPct,
        invNo: mockBatch.invNo,
        rNo: mockBatch.rNo,
        freeQty: mockBatch.freeQty,
        supplier: mockBatch.supplier,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      batches.push(batch);
    });
  });
  
  console.log(`Database initialized with ${products.length} products and ${batches.length} batches`);
};

// Initialize the database
initializeDb();

// Product Services
export const getAllProducts = (): Product[] => products;

export const getProductById = (id: string): Product | undefined => 
  products.find(p => p.id === id);

export const getProductByCode = (code: string): Product | undefined => 
  products.find(p => p.code === code);

export const createProduct = (product: Product): Product => {
  const newProduct = { 
    ...product, 
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = (id: string, product: Partial<Product>): Product | null => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  products[index] = { 
    ...products[index], 
    ...product,
    updatedAt: new Date()
  };
  return products[index];
};

export const deleteProduct = (id: string): boolean => {
  const initialLength = products.length;
  products = products.filter(p => p.id !== id);
  return products.length < initialLength;
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.code.toLowerCase().includes(lowerQuery) || 
      product.name.toLowerCase().includes(lowerQuery)
  );
};

// Batch Services
export const getAllBatches = (): Batch[] => batches;

export const getBatchById = (id: string): Batch | undefined => 
  batches.find(b => b.id === id);

export const getBatchesByProductCode = (productCode: string): Batch[] => 
  batches.filter(b => b.productCode === productCode);

export const createBatch = (batch: Batch): Batch => {
  const newBatch = { 
    ...batch, 
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  batches.push(newBatch);
  return newBatch;
};

export const updateBatch = (id: string, batch: Partial<Batch>): Batch | null => {
  const index = batches.findIndex(b => b.id === id);
  if (index === -1) return null;
  
  batches[index] = { 
    ...batches[index], 
    ...batch,
    updatedAt: new Date()
  };
  return batches[index];
};

export const deleteBatch = (id: string): boolean => {
  const initialLength = batches.length;
  batches = batches.filter(b => b.id !== id);
  return batches.length < initialLength;
};

// Sales Services
export const getAllSales = (): Sale[] => sales;

export const getSaleById = (id: string): Sale | undefined => 
  sales.find(s => s.id === id);

export const createSale = (sale: Sale): Sale => {
  const newSale = { 
    ...sale, 
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  sales.push(newSale);
  return newSale;
};

export const updateSale = (id: string, sale: Partial<Sale>): Sale | null => {
  const index = sales.findIndex(s => s.id === id);
  if (index === -1) return null;
  
  sales[index] = { 
    ...sales[index], 
    ...sale,
    updatedAt: new Date()
  };
  return sales[index];
};

export const deleteSale = (id: string): boolean => {
  const initialLength = sales.length;
  sales = sales.filter(s => s.id !== id);
  return sales.length < initialLength;
};

// Purchase Services
export const getAllPurchases = (): Purchase[] => purchases;

export const getPurchaseById = (id: string): Purchase | undefined => 
  purchases.find(p => p.id === id);

export const createPurchase = (purchase: Purchase): Purchase => {
  const newPurchase = { 
    ...purchase, 
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  purchases.push(newPurchase);
  return newPurchase;
};

export const updatePurchase = (id: string, purchase: Partial<Purchase>): Purchase | null => {
  const index = purchases.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  purchases[index] = { 
    ...purchases[index], 
    ...purchase,
    updatedAt: new Date()
  };
  return purchases[index];
};

export const deletePurchase = (id: string): boolean => {
  const initialLength = purchases.length;
  purchases = purchases.filter(p => p.id !== id);
  return purchases.length < initialLength;
};

// Receipt Services
export const getAllReceipts = (): Receipt[] => receipts;

export const getReceiptById = (id: string): Receipt | undefined => 
  receipts.find(r => r.id === id);

export const createReceipt = (receipt: Receipt): Receipt => {
  const newReceipt = { 
    ...receipt, 
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  receipts.push(newReceipt);
  return newReceipt;
};

export const updateReceipt = (id: string, receipt: Partial<Receipt>): Receipt | null => {
  const index = receipts.findIndex(r => r.id === id);
  if (index === -1) return null;
  
  receipts[index] = { 
    ...receipts[index], 
    ...receipt,
    updatedAt: new Date()
  };
  return receipts[index];
};

export const deleteReceipt = (id: string): boolean => {
  const initialLength = receipts.length;
  receipts = receipts.filter(r => r.id !== id);
  return receipts.length < initialLength;
};
