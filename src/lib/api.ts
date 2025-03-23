
// API connection configuration
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.pharmacentral.com' 
  : 'http://localhost:5000';

// Helper function for API requests
export async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}/api${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  
  return response.json();
}

// API endpoints for products
export const productApi = {
  getAll: () => fetchApi<any[]>('/products'),
  getById: (id: string) => fetchApi<any>(`/products/id/${id}`),
  getByCode: (code: string) => fetchApi<any>(`/products/code/${code}`),
  search: (query: string) => fetchApi<any[]>(`/products/search?query=${query}`),
  create: (data: any) => fetchApi<any>('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => fetchApi<any>(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchApi<any>(`/products/${id}`, {
    method: 'DELETE',
  }),
};

// API endpoints for batches
export const batchApi = {
  getAll: () => fetchApi<any[]>('/batches'),
  getById: (id: string) => fetchApi<any>(`/batches/${id}`),
  getByProductCode: (code: string) => fetchApi<any[]>(`/batches/product/${code}`),
  create: (data: any) => fetchApi<any>('/batches', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => fetchApi<any>(`/batches/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchApi<any>(`/batches/${id}`, {
    method: 'DELETE',
  }),
};

// API endpoints for sales
export const salesApi = {
  getAll: () => fetchApi<any[]>('/sales'),
  getById: (id: string) => fetchApi<any>(`/sales/${id}`),
  create: (data: any) => fetchApi<any>('/sales', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => fetchApi<any>(`/sales/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchApi<any>(`/sales/${id}`, {
    method: 'DELETE',
  }),
};

// API endpoints for purchases
export const purchaseApi = {
  getAll: () => fetchApi<any[]>('/purchases'),
  getById: (id: string) => fetchApi<any>(`/purchases/${id}`),
  create: (data: any) => fetchApi<any>('/purchases', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => fetchApi<any>(`/purchases/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchApi<any>(`/purchases/${id}`, {
    method: 'DELETE',
  }),
};

// API endpoints for receipts
export const receiptApi = {
  getAll: () => fetchApi<any[]>('/receipts'),
  getById: (id: string) => fetchApi<any>(`/receipts/${id}`),
  create: (data: any) => fetchApi<any>('/receipts', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => fetchApi<any>(`/receipts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchApi<any>(`/receipts/${id}`, {
    method: 'DELETE',
  }),
};
