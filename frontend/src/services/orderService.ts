import apiClient from './apiClient';
import { OrderPayload } from '../types/checkout';
import { OrderResponse } from '../types/orderResponse';

export const orderService = {
  createOrder: async (orderData: OrderPayload): Promise<OrderResponse> => {
    try {
      const response = await apiClient.post<OrderResponse>('/orders', orderData);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao criar pedido:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao processar seu pedido. Tente novamente.");
    }
  },

  // Opcional: Futura função para obter pedido por ID
  // getOrderById: async (orderId: string): Promise<OrderResponse> => {
  //   try {
  //     const response = await apiClient.get<OrderResponse>(`/orders/${orderId}`);
  //     return response.data;
  //   } catch (error: any) {
  //     console.error("Erro ao buscar pedido por ID:", error.response?.data || error.message);
  //     throw new Error(error.response?.data?.message || "Erro ao buscar os detalhes do pedido.");
  //   }
  // },
}; 