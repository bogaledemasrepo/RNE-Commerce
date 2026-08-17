export interface User {
  name: string;
  email: string;
  password?: string; // Optional, not stored in state
  avatar: string;
}
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
  categoryId: number;
  categoryName: string;
}

export interface PaginatedProductResponse {
  content: Product[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export type OrderStatus = 'all' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type TabType = 'all' | 'active' | 'completed' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
}
