
import { useState } from 'react';
import ProductSearch from '@/components/ProductSearch';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/layout/Header';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      
      {/* Main Content */}
      <div className="relative flex-1">
        <AnimatedBackground />
        <main className="relative z-10 flex-1 py-8 px-6">
          <div className="container max-w-7xl mx-auto">
            <ProductSearch />
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <footer className="py-4 px-6 text-sm text-center text-muted-foreground border-t border-border bg-white/60 backdrop-blur-md dark:bg-gray-900/60">
        <div className="container max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} Pharma Central. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
