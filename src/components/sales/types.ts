
export interface SalesItem {
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

export interface SalesSummary {
  discount: number;
  productDiscount: number;
  schemeDiscount: number;
  margin: number;
  grossAmount: number;
  totalDiscount: number;
  adjustment: number;
  roundOff: number;
  netAmount: number;
  totalGST: number;
}

export type TaxType = 'GST' | 'VAT' | 'None';
export type PaymentType = 'Credit' | 'Cash' | 'UPI' | 'Card';
