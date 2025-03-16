
import { useState } from 'react';
import ProductSearch from '@/components/ProductSearch';
import AnimatedBackground from '@/components/AnimatedBackground';
import { MoveUpRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="py-6 px-6 border-b border-border bg-white/50 backdrop-blur-md dark:bg-gray-900/40">
        <div className="container max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <MoveUpRight size={16} className="text-white" />
                </div>
                <h1 className="text-xl font-bold">Product-Batch Master</h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 py-8 px-6">
        <div className="container max-w-7xl mx-auto">
          <ProductSearch />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 px-6 text-sm text-center text-muted-foreground border-t border-border bg-white/50 backdrop-blur-md dark:bg-gray-900/40">
        <div className="container max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} Product Batch Master. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
