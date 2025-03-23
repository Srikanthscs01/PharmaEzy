
import React from 'react';
import { DollarSign, User, Calendar } from 'lucide-react';

const SalesHeader = () => {
  return (
    <header className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3">
        <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
          <DollarSign size={24} className="text-orange-500" />
        </div>
        <h1 className="text-xl font-bold">Sales Invoice</h1>
      </div>
      
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <User size={16} />
          <span>Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </header>
  );
};

export default SalesHeader;
