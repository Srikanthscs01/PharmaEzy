
import React from 'react';
import { ShoppingBag } from 'lucide-react';

const PurchaseHeader = () => {
  return (
    <header className="bg-teal-600 text-white p-4 flex items-center justify-between border-b border-teal-400">
      <div className="flex items-center gap-2">
        <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
          <ShoppingBag size={24} className="text-teal-600" />
        </div>
        <h1 className="text-xl font-bold">Purchase Entry</h1>
      </div>
      
      <div className="text-sm">
        <div>User: Admin</div>
        <div>{new Date().toLocaleDateString()}</div>
      </div>
    </header>
  );
};

export default PurchaseHeader;
