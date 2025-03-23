
export interface PurchaseItem {
  id?: string;
  purchaseId: string;
  code: string;
  productName: string;
  packing: string;
  batchNo: string;
  rate: number;
  qty: number;
  free: number;
  value: number;
  month: string;
  year: string;
  marginPercentage: number;
  retailMarginPercentage: number;
  gstPercentage: number;
  discount: number;
  gstAmount: number;
}

export interface Purchase {
  id?: string;
  supplier: string;
  remind: boolean;
  invoiceNo: string;
  holdStocks: boolean;
  company: string;
  lrNo: string;
  revCharge: boolean;
  entryNo: string;
  date: string;
  lrDate: string;
  entryDate: string;
  dueDate: string;
  taxType: string;
  purchaseType: string;
  items: PurchaseItem[];
  grossAmount?: number;
  discount?: number;
  gst?: number;
  netAmount?: number;
  status?: 'pending' | 'received' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}
