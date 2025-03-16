
import React from 'react';
import { Receipt } from 'lucide-react';

const ReceiptHeader = () => {
  return (
    <header className="bg-teal-700 text-white p-4 flex items-center justify-between border-b border-teal-500">
      <div className="flex items-center gap-2">
        <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
          <Receipt size={24} className="text-teal-700" />
        </div>
        <h1 className="text-xl font-bold">Receipts for Sales - Credit</h1>
      </div>
      
      <div className="text-sm">
        <div>User: Admin</div>
        <div>{new Date().toLocaleDateString()}</div>
      </div>
    </header>
  );
};

export default ReceiptHeader;
