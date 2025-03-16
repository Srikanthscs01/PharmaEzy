
export type ReceiptFormData = {
  customer: string;
  bankOrCash: "CASH" | "BANK" | string;
  receiptNumber: string;
  date: string;
  totalDueAmount: number;
};

export type BillItem = {
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
};

export type ChequeDetails = {
  amount: number;
  discountPercent: number;
  interestPercent: number;
  chequeNo: string;
  date: string;
  presentationDate: string;
  type: "MICR" | "NON-MICR" | string;
  note: string;
};

export type DraweeDetails = {
  code: string;
  name: string;
  branch: string;
  city: string;
};

export type ReceiptSummary = {
  gross: number;
  discountAmount: number;
  interestAmount: number;
  adjustment: number;
  netAmount: number;
};
