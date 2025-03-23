
import prisma from './prisma';
import { Product } from '../models/Product';
import { Batch } from '../models/Batch';
import { Sale, SaleItem } from '../models/Sale';
import { Purchase, PurchaseItem } from '../models/Purchase';
import { Receipt, BillItem, ChequeDetails, DraweeDetails } from '../models/Receipt';

// Product Services
export const getAllProducts = async (): Promise<Product[]> => {
  return await prisma.product.findMany();
};

export const getProductById = async (id: string): Promise<Product | null> => {
  return await prisma.product.findUnique({
    where: { id }
  });
};

export const getProductByCode = async (code: string): Promise<Product | null> => {
  return await prisma.product.findUnique({
    where: { code }
  });
};

export const createProduct = async (product: Product): Promise<Product> => {
  return await prisma.product.create({
    data: product
  });
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product | null> => {
  return await prisma.product.update({
    where: { id },
    data: product
  });
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    await prisma.product.delete({
      where: { id }
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  return await prisma.product.findMany({
    where: {
      OR: [
        { code: { contains: query } },
        { name: { contains: query } }
      ]
    }
  });
};

// Batch Services
export const getAllBatches = async (): Promise<Batch[]> => {
  return await prisma.batch.findMany();
};

export const getBatchById = async (id: string): Promise<Batch | null> => {
  return await prisma.batch.findUnique({
    where: { id }
  });
};

export const getBatchesByProductCode = async (productCode: string): Promise<Batch[]> => {
  return await prisma.batch.findMany({
    where: { productCode }
  });
};

export const createBatch = async (batch: Batch): Promise<Batch> => {
  return await prisma.batch.create({
    data: batch
  });
};

export const updateBatch = async (id: string, batch: Partial<Batch>): Promise<Batch | null> => {
  return await prisma.batch.update({
    where: { id },
    data: batch
  });
};

export const deleteBatch = async (id: string): Promise<boolean> => {
  try {
    await prisma.batch.delete({
      where: { id }
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
