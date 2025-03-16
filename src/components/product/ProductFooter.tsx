
import React from 'react';

const ProductFooter = () => {
  return (
    <footer className="py-4 px-6 text-sm text-center text-muted-foreground border-t border-border bg-white/60 backdrop-blur-md dark:bg-gray-900/60">
      <div className="container max-w-7xl mx-auto">
        <p>© {new Date().getFullYear()} Pharma Central. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default ProductFooter;
