
import { useState } from 'react';
import ProductSearch from '@/components/ProductSearch';
import AnimatedBackground from '@/components/AnimatedBackground';
import { MoveUpRight, Settings, Home, Package, ListChecks, BarChart3, Users, Tablets, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter
} from '@/components/ui/sidebar';

const Index = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Tablets size={16} className="text-white" />
              </div>
              <h1 className="text-lg font-bold">Pharma Central</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Home" isActive={true} href="/">
                      <Home size={18} />
                      <span>Home</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Products" href="/products">
                      <Package size={18} />
                      <span>Products</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Batches">
                      <ListChecks size={18} />
                      <span>Batches</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Analytics">
                      <BarChart3 size={18} />
                      <span>Analytics</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Suppliers">
                      <Users size={18} />
                      <span>Suppliers</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="px-4 py-2 text-xs text-muted-foreground">
              <p>© {new Date().getFullYear()} Pharma Central</p>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="py-4 px-6 border-b border-border bg-white/60 backdrop-blur-md dark:bg-gray-900/60 shadow-sm sticky top-0 z-10">
            <div className="container max-w-7xl mx-auto">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <SidebarTrigger className="mr-3" />
                  <h1 className="text-xl font-bold">Product Search</h1>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Settings size={18} className="text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </div>
          </header>
          
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
      </div>
    </SidebarProvider>
  );
};

export default Index;
