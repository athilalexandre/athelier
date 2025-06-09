import { Router, RequestHandler } from 'express';
import * as productController from '../controllers/productController';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware';
import { Role } from '../../src/generated/prisma';

const router = Router();

router.post('/', authenticateToken, authorizeRoles(Role.ADMIN), productController.createProduct as RequestHandler);
router.get('/', productController.getProducts as RequestHandler);
router.get('/:id', productController.getProductById as RequestHandler);
router.put('/:id', authenticateToken, authorizeRoles(Role.ADMIN), productController.updateProduct as RequestHandler);
router.delete('/:id', authenticateToken, authorizeRoles(Role.ADMIN), productController.deleteProduct as RequestHandler);

export default router; 