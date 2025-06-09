import { Router, RequestHandler } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

router.post('/register', authController.register as RequestHandler);
router.post('/login', authController.login as RequestHandler);

export default router; 