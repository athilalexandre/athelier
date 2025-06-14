import { Product } from './api';

// Definindo a estrutura de um item de carrinho para o payload de envio ao backend
// Esta é uma versão "achatada" do CartItem para envio
export interface CheckoutItem {
  productId: string;
  quantity: number;
  priceAtAddition: number; // Preço no momento da adição (para segurança no backend)
  customizationText?: string;
  productName: string; // Nome para referência no backend (logs, mensagens de erro)
}

export interface ShippingAddress {
  fullName: string;
  cpf: string;
  postalCode: string;
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
  items: CheckoutItem[];
  subtotal: number;
  totalAmount: number;
  paymentMethod: string;
  paymentTransactionId?: string;
} 