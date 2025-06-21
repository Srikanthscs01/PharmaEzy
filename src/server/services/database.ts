import prisma from './prisma';
import { Product } from '../models/Product';
import { Batch } from '../models/Batch';
import { Sale, SaleItem } from '../models/Sale';
import { Purchase, PurchaseItem } from '../models/Purchase';
import { Receipt, BillItem, ChequeDetails, DraweeDetails } from '../models/Receipt';

// Product Services
export const getAllProducts = async (): Promise<Product[]> => {
  return await prisma.product.findMany({
    select: {
      id: true,
      code: true,
      name: true,
      packing: true,
      marketedBy: true,
      // Map database fields to new interface
    }
  }).then(products => products.map(p => ({
    RndId: parseInt(p.id || '0'),
    Name: p.name,
    Packing: p.packing || '',
    MarketedBy: p.marketedBy,
    Mrp: undefined // This would need to come from batches or be added to product model
  })));
};

export const getProductById = async (rndId: number): Promise<Product | null> => {
  const product = await prisma.product.findUnique({
    where: { id: rndId.toString() }
  });
  
  if (!product) return null;
  
  return {
    RndId: parseInt(product.id || '0'),
    Name: product.name,
    Packing: product.packing || '',
    MarketedBy: product.marketedBy,
    Mrp: undefined
  };
};

export const getProductByCode = async (code: string): Promise<Product | null> => {
  const product = await prisma.product.findUnique({
    where: { code }
  });
  
  if (!product) return null;
  
  return {
    RndId: parseInt(product.id || '0'),
    Name: product.name,
    Packing: product.packing || '',
    MarketedBy: product.marketedBy,
    Mrp: undefined
  };
};

export const createProduct = async (product: Omit<Product, 'RndId'>): Promise<Product> => {
  const created = await prisma.product.create({
    data: {
      name: product.Name,
      packing: product.Packing,
      marketedBy: product.MarketedBy,
      code: `P${Date.now()}` // Generate a code if needed
    }
  });
  
  return {
    RndId: parseInt(created.id || '0'),
    Name: created.name,
    Packing: created.packing || '',
    MarketedBy: created.marketedBy,
    Mrp: product.Mrp
  };
};

export const updateProduct = async (rndId: number, product: Partial<Product>): Promise<Product | null> => {
  const updated = await prisma.product.update({
    where: { id: rndId.toString() },
    data: {
      ...(product.Name && { name: product.Name }),
      ...(product.Packing && { packing: product.Packing }),
      ...(product.MarketedBy && { marketedBy: product.MarketedBy })
    }
  });
  
  return {
    RndId: parseInt(updated.id || '0'),
    Name: updated.name,
    Packing: updated.packing || '',
    MarketedBy: updated.marketedBy,
    Mrp: product.Mrp
  };
};

export const deleteProduct = async (rndId: number): Promise<boolean> => {
  try {
    await prisma.product.delete({
      where: { id: rndId.toString() }
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { code: { contains: query } },
        { name: { contains: query } }
      ]
    }
  });
  
  return products.map(p => ({
    RndId: parseInt(p.id || '0'),
    Name: p.name,
    Packing: p.packing || '',
    MarketedBy: p.marketedBy,
    Mrp: undefined
  }));
};

// Batch Services
export const getAllBatches = async (): Promise<Batch[]> => {
  const batches = await prisma.batch.findMany();
  
  return batches.map(b => ({
    RndId: parseInt(b.id || '0'),
    BatchNo: b.batchNo,
    PurDate: b.purDate || '',
    ExpMonth: b.expiry?.split('/')[0] || '',
    ExpYear: b.expiry?.split('/')[1] || '',
    PurPrice: b.purPrice || 0,
    CostPrice: b.costPrice || 0,
    Mrp: b.mrp,
    SupName: b.supplier || '',
    Qty: b.qty,
    SaleGst: b.gstPct
  }));
};

export const getBatchById = async (rndId: number): Promise<Batch | null> => {
  const batch = await prisma.batch.findUnique({
    where: { id: rndId.toString() }
  });
  
  if (!batch) return null;
  
  return {
    RndId: parseInt(batch.id || '0'),
    BatchNo: batch.batchNo,
    PurDate: batch.purDate || '',
    ExpMonth: batch.expiry?.split('/')[0] || '',
    ExpYear: batch.expiry?.split('/')[1] || '',
    PurPrice: batch.purPrice || 0,
    CostPrice: batch.costPrice || 0,
    Mrp: batch.mrp,
    SupName: batch.supplier || '',
    Qty: batch.qty,
    SaleGst: batch.gstPct
  };
};

export const getBatchesByProductId = async (productRndId: number): Promise<Batch[]> => {
  const batches = await prisma.batch.findMany({
    where: { productCode: productRndId.toString() } // Assuming productCode links to product ID
  });
  
  return batches.map(b => ({
    RndId: parseInt(b.id || '0'),
    BatchNo: b.batchNo,
    PurDate: b.purDate || '',
    ExpMonth: b.expiry?.split('/')[0] || '',
    ExpYear: b.expiry?.split('/')[1] || '',
    PurPrice: b.purPrice || 0,
    CostPrice: b.costPrice || 0,
    Mrp: b.mrp,
    SupName: b.supplier || '',
    Qty: b.qty,
    SaleGst: b.gstPct
  }));
};

export const createBatch = async (batch: Omit<Batch, 'RndId'>): Promise<Batch> => {
  const created = await prisma.batch.create({
    data: {
      batchNo: batch.BatchNo,
      purDate: batch.PurDate,
      expiry: `${batch.ExpMonth}/${batch.ExpYear}`,
      purPrice: batch.PurPrice,
      costPrice: batch.CostPrice,
      mrp: batch.Mrp,
      supplier: batch.SupName,
      qty: batch.Qty,
      qit: batch.Qty, // Assuming qit equals qty initially
      gstPct: batch.SaleGst,
      productCode: '1' // This would need to be provided or calculated
    }
  });
  
  return {
    RndId: parseInt(created.id || '0'),
    BatchNo: created.batchNo,
    PurDate: created.purDate || '',
    ExpMonth: created.expiry?.split('/')[0] || '',
    ExpYear: created.expiry?.split('/')[1] || '',
    PurPrice: created.purPrice || 0,
    CostPrice: created.costPrice || 0,
    Mrp: created.mrp,
    SupName: created.supplier || '',
    Qty: created.qty,
    SaleGst: created.gstPct
  };
};

export const updateBatch = async (rndId: number, batch: Partial<Batch>): Promise<Batch | null> => {
  const updated = await prisma.batch.update({
    where: { id: rndId.toString() },
    data: {
      ...(batch.BatchNo && { batchNo: batch.BatchNo }),
      ...(batch.PurDate && { purDate: batch.PurDate }),
      ...(batch.ExpMonth && batch.ExpYear && { expiry: `${batch.ExpMonth}/${batch.ExpYear}` }),
      ...(batch.PurPrice !== undefined && { purPrice: batch.PurPrice }),
      ...(batch.CostPrice !== undefined && { costPrice: batch.CostPrice }),
      ...(batch.Mrp !== undefined && { mrp: batch.Mrp }),
      ...(batch.SupName && { supplier: batch.SupName }),
      ...(batch.Qty !== undefined && { qty: batch.Qty }),
      ...(batch.SaleGst !== undefined && { gstPct: batch.SaleGst })
    }
  });
  
  return {
    RndId: parseInt(updated.id || '0'),
    BatchNo: updated.batchNo,
    PurDate: updated.purDate || '',
    ExpMonth: updated.expiry?.split('/')[0] || '',
    ExpYear: updated.expiry?.split('/')[1] || '',
    PurPrice: updated.purPrice || 0,
    CostPrice: updated.costPrice || 0,
    Mrp: updated.mrp,
    SupName: updated.supplier || '',
    Qty: updated.qty,
    SaleGst: updated.gstPct
  };
};

export const deleteBatch = async (rndId: number): Promise<boolean> => {
  try {
    await prisma.batch.delete({
      where: { id: rndId.toString() }
    });
    return true;
  } catch (error) {
    return false;
  }
};

// Sales Services
export const getAllSales = async (): Promise<Sale[]> => {
  return await prisma.sale.findMany({
    include: { items: true }
  });
};

export const getSaleById = async (id: string): Promise<Sale | null> => {
  return await prisma.sale.findUnique({
    where: { id },
    include: { items: true }
  });
};

export const createSale = async (sale: Sale): Promise<Sale> => {
  const { items, ...saleData } = sale;
  
  return await prisma.$transaction(async (tx) => {
    // Create the sale record
    const createdSale = await tx.sale.create({
      data: {
        ...saleData,
        items: {
          create: items
        }
      },
      include: { items: true }
    });
    
    return createdSale;
  });
};

export const updateSale = async (id: string, sale: Partial<Sale>): Promise<Sale | null> => {
  const { items, ...saleData } = sale;
  
  return await prisma.$transaction(async (tx) => {
    // Update sale record
    const updatedSale = await tx.sale.update({
      where: { id },
      data: saleData,
    });
    
    // If items are provided, replace them
    if (items && items.length > 0) {
      // Delete existing items
      await tx.saleItem.deleteMany({
        where: { saleId: id }
      });
      
      // Create new items
      await Promise.all(items.map(item => 
        tx.saleItem.create({
          data: {
            ...item,
            saleId: id
          }
        })
      ));
    }
    
    // Return the updated sale with items
    return await tx.sale.findUnique({
      where: { id },
      include: { items: true }
    });
  });
};

export const deleteSale = async (id: string): Promise<boolean> => {
  try {
    await prisma.sale.delete({
      where: { id }
    });
    return true;
  } catch (error) {
    return false;
  }
};

// Purchase Services
export const getAllPurchases = async (): Promise<Purchase[]> => {
  return await prisma.purchase.findMany({
    include: { items: true }
  });
};

export const getPurchaseById = async (id: string): Promise<Purchase | null> => {
  return await prisma.purchase.findUnique({
    where: { id },
    include: { items: true }
  });
};

export const createPurchase = async (purchase: Purchase): Promise<Purchase> => {
  const { items, ...purchaseData } = purchase;
  
  return await prisma.$transaction(async (tx) => {
    // Create the purchase record
    const createdPurchase = await tx.purchase.create({
      data: {
        ...purchaseData,
        items: {
          create: items
        }
      },
      include: { items: true }
    });
    
    return createdPurchase;
  });
};

export const updatePurchase = async (id: string, purchase: Partial<Purchase>): Promise<Purchase | null> => {
  const { items, ...purchaseData } = purchase;
  
  return await prisma.$transaction(async (tx) => {
    // Update purchase record
    const updatedPurchase = await tx.purchase.update({
      where: { id },
      data: purchaseData,
    });
    
    // If items are provided, replace them
    if (items && items.length > 0) {
      // Delete existing items
      await tx.purchaseItem.deleteMany({
        where: { purchaseId: id }
      });
      
      // Create new items
      await Promise.all(items.map(item => 
        tx.purchaseItem.create({
          data: {
            ...item,
            purchaseId: id
          }
        })
      ));
    }
    
    // Return the updated purchase with items
    return await tx.purchase.findUnique({
      where: { id },
      include: { items: true }
    });
  });
};

export const deletePurchase = async (id: string): Promise<boolean> => {
  try {
    await prisma.purchase.delete({
      where: { id }
    });
    return true;
  } catch (error) {
    return false;
  }
};

// Receipt Services
export const getAllReceipts = async (): Promise<Receipt[]> => {
  return await prisma.receipt.findMany({
    include: { 
      bills: true,
      chequeDetails: true,
      draweeDetails: true
    }
  });
};

export const getReceiptById = async (id: string): Promise<Receipt | null> => {
  return await prisma.receipt.findUnique({
    where: { id },
    include: { 
      bills: true,
      chequeDetails: true,
      draweeDetails: true
    }
  });
};

export const createReceipt = async (receipt: Receipt): Promise<Receipt> => {
  const { bills, chequeDetails, draweeDetails, ...receiptData } = receipt;
  
  return await prisma.$transaction(async (tx) => {
    // Create the receipt record
    const createdReceipt = await tx.receipt.create({
      data: {
        ...receiptData,
        bills: {
          create: bills
        },
        ...(chequeDetails && {
          chequeDetails: {
            create: chequeDetails
          }
        }),
        ...(draweeDetails && {
          draweeDetails: {
            create: draweeDetails
          }
        })
      },
      include: { 
        bills: true,
        chequeDetails: true,
        draweeDetails: true
      }
    });
    
    return createdReceipt;
  });
};

export const updateReceipt = async (id: string, receipt: Partial<Receipt>): Promise<Receipt | null> => {
  const { bills, chequeDetails, draweeDetails, ...receiptData } = receipt;
  
  return await prisma.$transaction(async (tx) => {
    // Update receipt record
    const updatedReceipt = await tx.receipt.update({
      where: { id },
      data: receiptData,
    });
    
    // If bills are provided, replace them
    if (bills && bills.length > 0) {
      // Delete existing bills
      await tx.billItem.deleteMany({
        where: { receiptId: id }
      });
      
      // Create new bills
      await Promise.all(bills.map(bill => 
        tx.billItem.create({
          data: {
            ...bill,
            receiptId: id
          }
        })
      ));
    }
    
    // If cheque details are provided, update or create them
    if (chequeDetails) {
      await tx.chequeDetails.upsert({
        where: { receiptId: id },
        update: chequeDetails,
        create: {
          ...chequeDetails,
          receiptId: id
        }
      });
    }
    
    // If drawee details are provided, update or create them
    if (draweeDetails) {
      await tx.draweeDetails.upsert({
        where: { receiptId: id },
        update: draweeDetails,
        create: {
          ...draweeDetails,
          receiptId: id
        }
      });
    }
    
    // Return the updated receipt with related entities
    return await tx.receipt.findUnique({
      where: { id },
      include: { 
        bills: true,
        chequeDetails: true,
        draweeDetails: true
      }
    });
  });
};

export const deleteReceipt = async (id: string): Promise<boolean> => {
  try {
    await prisma.receipt.delete({
      where: { id }
    });
    return true;
  } catch (error) {
    return false;
  }
};
