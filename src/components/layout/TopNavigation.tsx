
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Tablets, Home, Package, ListChecks, BarChart3, Users, DollarSign, ShoppingBag, Receipt } from 'lucide-react';

const TopNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <NavigationMenu className="max-w-none w-full justify-start">
      <NavigationMenuList className="flex flex-wrap gap-1">
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink 
              className={navigationMenuTriggerStyle() + (currentPath === '/' ? ' bg-accent text-accent-foreground' : '')} 
            >
              <Home size={18} className="mr-2" />
              <span>Home</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/products">
            <NavigationMenuLink 
              className={navigationMenuTriggerStyle() + (currentPath === '/products' ? ' bg-accent text-accent-foreground' : '')}
            >
              <Package size={18} className="mr-2" />
              <span>Products</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <ListChecks size={18} className="mr-2" />
            <span>Batches</span>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <BarChart3 size={18} className="mr-2" />
            <span>Analytics</span>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Users size={18} className="mr-2" />
            <span>Suppliers</span>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/sales">
            <NavigationMenuLink 
              className={navigationMenuTriggerStyle() + (currentPath === '/sales' ? ' bg-accent text-accent-foreground' : '')}
            >
              <DollarSign size={18} className="mr-2" />
              <span>Sales</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/purchases">
            <NavigationMenuLink 
              className={navigationMenuTriggerStyle() + (currentPath === '/purchases' ? ' bg-accent text-accent-foreground' : '')}
            >
              <ShoppingBag size={18} className="mr-2" />
              <span>Purchases</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/receipts">
            <NavigationMenuLink 
              className={navigationMenuTriggerStyle() + (currentPath === '/receipts' ? ' bg-accent text-accent-foreground' : '')}
            >
              <Receipt size={18} className="mr-2" />
              <span>Receipts</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default TopNavigation;
