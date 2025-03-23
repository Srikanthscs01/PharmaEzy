
export interface SaleItem {
  id?: string;
  saleId: string;
  code: string;
  productName: string;
  packing: string;
  batch: string;
  qty: number;
  free: number;
  discount: number;
  rate: number;
  value: number;
  gstPercentage: number;
  gstAmount: number;
}

export interface Sale {
  id?: string;
  customer: string;
  date: string;
  invoiceNo: string;
  items: SaleItem[];
  discount?: number;
  productDiscount?: number;
  schemeDiscount?: number;
  margin?: number;
  grossAmount: number;
  totalDiscount?: number;
  adjustment?: number;
  roundOff?: number;
  netAmount: number;
  totalGST?: number;
  paymentType?: string;
  status?: 'pending' | 'completed' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}
