import { Product } from './api';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

export interface OrderItemResponse {
  id: string;
  quantity: number;
  priceAtPurchase: number;
  customizationText?: string;
  productId: string;
  product: Product; // Inclui os detalhes completos do produto
}

export interface OrderResponse {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string; // Ou Date, dependendo de como você parseia
  updatedAt: string; // Ou Date
  
  userId: string;

  shippingFullName: string;
  shippingPostalCode: string;
  shippingStreet: string;
  shippingNumber: string;
  shippingComplement?: string;
  shippingNeighborhood: string;
  shippingCity: string;
  shippingState: string;
  shippingPhone: string;

  paymentMethod: string;
  paymentTransactionId?: string;

  items: OrderItemResponse[];
} 