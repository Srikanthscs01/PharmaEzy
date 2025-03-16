import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Pill, 
  Search, 
  Save, 
  Edit, 
  X, 
  Plus, 
  Package, 
  Trash2,
  ArrowRightCircle,
  Settings,
  Home,
  ListChecks,
  BarChart3,
  Users,
  Tablets
} from 'lucide-react';
import { Link } from 'react-router-dom';
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
import { useToast } from '@/components/ui/use-toast';
import AnimatedBackground from '@/components/AnimatedBackground';

type ProductFormValues = {
  code: string;
  uniCode: string;
  name: string;
  packing: string;
  boxPack: string;
  casePack: string;
  printMark: string;
  hsn: string;
  company: string;
  rackNo: string;
  mark: string;
  sch: string;
  aiodCode: string;
  marketedBy: string;
  category: string;
  saleQtyMin: string;
  max: string;
  orderLevel: string;
  orderQty: string;
  boxQtyRates: string;
  boxPurPrice: string;
  comment: string;
  discontinued: boolean;
  purchaseQty: string;
  saleQty: string;
  purchaseFree: string;
  saleFree: string;
  drugFormula: string;
};

const Products = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const form = useForm<ProductFormValues>({
    defaultValues: {
      code: '',
      uniCode: '',
      name: '',
      packing: '',
      boxPack: '',
      casePack: '',
      printMark: '',
      hsn: '',
      company: '',
      rackNo: '',
      mark: '',
      sch: '',
      aiodCode: '',
      marketedBy: '',
      category: '',
      saleQtyMin: '',
      max: '',
      orderLevel: '',
      orderQty: '',
      boxQtyRates: '',
      boxPurPrice: '',
      comment: '',
      discontinued: false,
      purchaseQty: '',
      saleQty: '',
      purchaseFree: '',
      saleFree: '',
      drugFormula: '',
    }
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log('Form submitted:', data);
    toast({
      title: "Product Saved",
      description: `${data.name} has been saved successfully.`,
    });
    setIsEditing(false);
  };

  const handleNew = () => {
    form.reset();
    setIsEditing(true);
    toast({
      title: "New Product",
      description: "Enter details for the new product",
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    toast({
      description: "You can now edit the product details",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.reset();
    toast({
      variant: "destructive",
      description: "Changes have been discarded",
    });
  };

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
                    <SidebarMenuButton tooltip="Home" asChild>
                      <Link to="/">
                        <Home size={18} />
                        <span>Home</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Products" isActive={true} asChild>
                      <Link to="/products">
                        <Package size={18} />
                        <span>Products</span>
                      </Link>
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
          <header className="py-4 px-6 border-b border-border bg-white/60 backdrop-blur-md dark:bg-gray-900/60 shadow-sm sticky top-0 z-10">
            <div className="container max-w-7xl mx-auto">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <SidebarTrigger className="mr-3" />
                  <h1 className="text-xl font-bold">Product Master</h1>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Settings size={18} className="text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </div>
          </header>
          
          <div className="relative flex-1">
            <AnimatedBackground />
            <main className="relative z-10 flex-1 py-8 px-6">
              <div className="container max-w-7xl mx-auto">
                <div className="form-card p-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-medium underline">Code:</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={!isEditing} className="input-field" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="uniCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-medium underline">UniCode:</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={!isEditing} className="input-field" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <Button type="button" variant="link" className="text-blue-600 hover:text-blue-800">
                            Check Online (F8)
                          </Button>
                          
                          <div className="flex items-center space-x-2">
                            <FormField
                              control={form.control}
                              name="discontinued"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormLabel className="font-medium underline">Discontinued:</FormLabel>
                                  <FormControl>
                                    <Checkbox 
                                      checked={field.value} 
                                      onCheckedChange={field.onChange} 
                                      disabled={!isEditing}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium underline">Name:</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={!isEditing} className="input-field" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4">
                        <FormField
                          control={form.control}
                          name="packing"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium underline">Packing:</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={!isEditing} className="input-field" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="boxPack"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium underline">Box Pack:</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={!isEditing} className="input-field" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="casePack"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium underline">Case Pack:</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={!isEditing} className="input-field" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="printMark"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium underline">Print Mark:</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={!isEditing} className="input-field" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="hsn"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium underline">HSN:</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={!isEditing} className="input-field" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium underline">Company:</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={!isEditing} className="input-field" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-10 gap-4">
                        <div className="col-span-2">
                          <FormField
                            control={form.control}
                            name="rackNo"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-medium underline">Rack No:</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={!isEditing} className="input-field" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="col-span-1">
                          <FormField
                            control={form.control}
                            name="mark"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-medium underline">Mark:</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={!isEditing} className="input-field" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="col-span-2">
                          <FormField
                            control={form.control}
                            name="sch"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-medium underline">Sch:</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={!isEditing} className="input-field" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="col-span-5">
                          <FormField
                            control={form.control}
                            name="aiodCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-medium underline">Aiod Code:</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={!isEditing} className="input-field" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2">
                          <FormField
                            control={form.control}
                            name="marketedBy"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-medium underline">Marketed By:</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={!isEditing} className="input-field" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="col-span-1">
                          <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-medium underline">Category:</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={!isEditing} className="input-field" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-7 space-y-4">
                          <div className="grid grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="saleQtyMin"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-medium underline">Sale Qty Min.:</FormLabel>
                                  <FormControl>
                                    <Input {...field} disabled={!isEditing} className="input-field" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="max"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-medium underline">Max:</FormLabel>
                                  <FormControl>
                                    <Input {...field} disabled={!isEditing} className="input-field" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="orderLevel"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-medium underline">Order Level:</FormLabel>
                                  <FormControl>
                                    <Input {...field} disabled={!isEditing} className="input-field" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="orderQty"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-medium underline">Order Qty:</FormLabel>
                                  <FormControl>
                                    <Input {...field} disabled={!isEditing} className="input-field" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="boxQtyRates"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-medium underline">Box. Qty (Rates):</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={!isEditing} className="input-field" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="boxPurPrice"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-medium underline">Box. Pur.Price:</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={!isEditing} className="input-field" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="col-span-5 space-y-4">
                          <div className="border border-border rounded-md p-4 bg-cyan-50/50 dark:bg-cyan-950/30">
                            <div className="text-center font-semibold mb-3 underline">Scheme</div>
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="purchaseQty"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="font-medium">Purc. Qty:</FormLabel>
                                    <FormControl>
                                      <Input {...field} disabled={!isEditing} className="input-field" />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="saleQty"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="font-medium">Sale Qty:</FormLabel>
                                    <FormControl>
                                      <Input {...field} disabled={!isEditing} className="input-field" />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="purchaseFree"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="font-medium">Purc. Free:</FormLabel>
                                    <FormControl>
                                      <Input {...field} disabled={!isEditing} className="input-field" />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="saleFree"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="font-medium">Sale Free:</FormLabel>
                                    <FormControl>
                                      <Input {...field} disabled={!isEditing} className="input-field" />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="drugFormula"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-medium underline">Drug Formula (Ingredients):</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    {...field} 
                                    disabled={!isEditing} 
                                    className="bg-cyan-50 dark:bg-cyan-950/40 min-h-[120px]" 
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <FormField
                          control={form.control}
                          name="comment"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium underline">Comment:</FormLabel>
                              <FormControl>
                                <Textarea {...field} disabled={!isEditing} className="input-field" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-4">
                        <Button type="button" variant="outline" className="flex items-center gap-2">
                          <ArrowRightCircle size={16} />
                          Rates & Misc...
                        </Button>
                        
                        <Button type="button" variant="outline" className="flex items-center gap-2">
                          <ArrowRightCircle size={16} />
                          Batches
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6 text-sm text-muted-foreground">
                        <div>Added Date: N/A</div>
                        <div>Modified Date: N/A</div>
                      </div>
                      
                      <div className="flex justify-between border-t border-cyan-100 dark:border-cyan-800/30 pt-6">
                        <div className="flex gap-2">
                          <Button type="button" variant="outline" className="bg-amber-100 hover:bg-amber-200 border-amber-200" onClick={() => console.log('Search clicked')}>
                            <Search size={16} className="mr-1" />
                            Search
                          </Button>
                          
                          <Button type="button" variant="outline" className="bg-blue-100 hover:bg-blue-200 border-blue-200" onClick={handleNew}>
                            <Plus size={16} className="mr-1" />
                            New
                          </Button>
                        </div>
                        
                        <div className="flex gap-2">
                          {isEditing ? (
                            <>
                              <Button type="submit" variant="outline" className="bg-green-100 hover:bg-green-200 border-green-200">
                                <Save size={16} className="mr-1" />
                                Save
                              </Button>
                              
                              <Button type="button" variant="outline" className="bg-red-100 hover:bg-red-200 border-red-200" onClick={handleCancel}>
                                <X size={16} className="mr-1" />
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button type="button" variant="outline" className="bg-yellow-100 hover:bg-yellow-200 border-yellow-200" onClick={handleEdit}>
                                <Edit size={16} className="mr-1" />
                                Edit
                              </Button>
                              
                              <Button type="button" variant="outline" className="bg-red-100 hover:bg-red-200 border-red-200">
                                <Trash2 size={16} className="mr-1" />
                                Delete
                              </Button>
                            </>
                          )}
                          
                          <Button type="button" variant="outline" onClick={() => console.log('A.Code clicked')}>
                            A.Code
                          </Button>
                          
                          <Button type="button" variant="outline" onClick={() => console.log('Close clicked')}>
                            Close
                          </Button>
                        </div>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </main>
          </div>
          
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

export default Products;
