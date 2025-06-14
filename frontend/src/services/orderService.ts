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

  getOrderById: async (orderId: string): Promise<OrderResponse> => {
    try {
      const response = await apiClient.get<OrderResponse>(`/orders/${orderId}`);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao buscar pedido:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao buscar os detalhes do pedido.");
    }
  },

  getUserOrders: async (): Promise<OrderResponse[]> => {
    try {
      const response = await apiClient.get<OrderResponse[]>('/orders/user');
      return response.data;
    } catch (error: any) {
      console.error("Erro ao buscar histórico de pedidos:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao buscar seu histórico de pedidos.");
    }
  },

  updateOrderStatus: async (orderId: string, status: string): Promise<OrderResponse> => {
    try {
      const response = await apiClient.patch<OrderResponse>(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error: any) {
      console.error("Erro ao atualizar status do pedido:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao atualizar o status do pedido.");
    }
  }
}; 