import { Request, Response } from 'express';
import { orderService } from '../services/orderService';
import { CreateOrderPayload } from '../types/order';
import { Role } from '../generated/prisma'; // Importar Role do Prisma Client

interface AuthenticatedRequest extends Request {
  user?: { id: string; role: Role }; // Usar o enum Role do Prisma para compatibilidade de tipos
}

export const orderController = {
  createOrderHandler: async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Não autorizado: ID do usuário ausente.' });
    }

    const userId = req.user.id;
    const orderData: CreateOrderPayload = req.body;

    try {
      const newOrder = await orderService.createOrder(userId, orderData);
      return res.status(201).json(newOrder);
    } catch (error: any) {
      console.error('Erro ao criar pedido:', error);

      if (error.message.includes("Estoque insuficiente")) {
        return res.status(400).json({ message: error.message });
      }
      if (error.message.includes("não encontrado")) {
        return res.status(400).json({ message: error.message });
      }
      if (error.message.includes("carrinho está vazio")) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: 'Erro interno do servidor ao criar pedido.' });
    }
  },
}; 