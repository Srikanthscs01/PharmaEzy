
export interface Batch {
  RndId: number;
  BatchNo: string;
  PurDate: string;
  ExpMonth: string;
  ExpYear: string;
  PurPrice: number;
  CostPrice: number;
  Mrp: number;
  SupName: string;
  Qty: number;
  SaleGst?: number;
}
