import { CartItem } from './cart';

export interface ShippingAddress {
  fullName: string;
  cpf: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  phone: string;
}

export interface OrderPayload {
  shippingAddress: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  totalAmount: number;
  // Pode incluir outros campos como frete, impostos, etc., em fases futuras.
} 