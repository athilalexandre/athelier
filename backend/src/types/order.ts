export interface BackendShippingAddress {
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

export interface BackendCartItem {
  productId: string;
  quantity: number;
  customizationText?: string;
  priceAtAddition: number; // Preço do item no momento da adição no carrinho (do frontend)
  productName: string; // Nome do produto para mensagens de erro/log
}

// Este tipo espelha o OrderPayload do frontend, mas para uso no backend
export interface CreateOrderPayload {
  shippingAddress: BackendShippingAddress;
  items: BackendCartItem[];
  paymentMethod: string;
  paymentTransactionId?: string;
} 