
export interface Batch {
  id?: string;
  productCode: string;
  batchNo: string;
  billPrice: number;
  mrp: number;
  expiry: string;
  qty: number;
  qit: number;
  type?: string;
  purNo?: string;
  purDate?: string;
  rcvdDate?: string;
  from?: string;
  barCode?: string;
  purPrice?: number;
  scheme?: number;
  schemePct?: number;
  schAmt?: number;
  disPct?: number;
  addDisPct?: number;
  gstPct?: number;
  specialPrice?: number;
  stockistPrice?: number;
  costPrice?: number;
  acPrice?: number;
  retailerMarginPct?: number;
  marginPct?: number;
  invNo?: string;
  rNo?: string;
  freeQty?: number;
  supplier?: string;
  selected?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
