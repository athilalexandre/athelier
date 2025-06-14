import { Router } from 'express';
import { orderController } from '../controllers/orderController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { asyncHandler } from '../lib/asyncHandler';

const router = Router();

// Rota para criar um novo pedido
router.post('/', authenticateToken, asyncHandler(orderController.createOrderHandler));

export default router; 