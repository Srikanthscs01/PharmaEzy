
export interface BillItem {
  id?: string;
  receiptId: string;
  billNo: string;
  billDate: string;
  billDisAmtAndPercent: string;
  billAmount: number;
  dueAmount: number;
  nowReceived: number;
  discountAmount: number;
  adjustment: number;
  balance: number;
  days: number;
  interest: number;
}

export interface ChequeDetails {
  id?: string;
  receiptId: string;
  amount: number;
  discountPercent: number;
  interestPercent: number;
  chequeNo: string;
  date: string;
  presentationDate: string;
  type: "MICR" | "NON-MICR" | string;
  note: string;
}

export interface DraweeDetails {
  id?: string;
  receiptId: string;
  code: string;
  name: string;
  branch: string;
  city: string;
}

export interface Receipt {
  id?: string;
  customer: string;
  bankOrCash: "CASH" | "BANK" | string;
  receiptNumber: string;
  date: string;
  totalDueAmount: number;
  bills: BillItem[];
  chequeDetails?: ChequeDetails;
  draweeDetails?: DraweeDetails;
  gross?: number;
  discountAmount?: number;
  interestAmount?: number;
  adjustment?: number;
  netAmount?: number;
  status?: 'pending' | 'completed' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}
