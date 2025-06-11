import { Product } from './api';

export interface CartItem {
  contentId: string; // productId + hash da customização
  product: Product;
  quantity: number;
  customization?: string;
  priceAtAddition: number; // Preço no momento da adição
}

export interface CartState {
  items: CartItem[];
} 