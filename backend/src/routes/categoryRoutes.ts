import { Router, RequestHandler } from 'express';
import * as categoryController from '../controllers/categoryController';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware';
import { Role } from '../types/role';

const router = Router();

router.post('/', authenticateToken, authorizeRoles(Role.ADMIN), categoryController.createCategory as RequestHandler);
router.get('/', categoryController.getCategories as RequestHandler);
router.get('/:id', categoryController.getCategoryById as RequestHandler);
router.put('/:id', authenticateToken, authorizeRoles(Role.ADMIN), categoryController.updateCategory as RequestHandler);
router.delete('/:id', authenticateToken, authorizeRoles(Role.ADMIN), categoryController.deleteCategory as RequestHandler);

export default router; 