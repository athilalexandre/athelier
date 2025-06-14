import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import prisma from './lib/prisma';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3001' }));
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the backend!');
});

app.get('/api', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Backend is healthy!' });
});

// Product routes
app.use('/api/products', productRoutes);

// Category routes
app.use('/api/categories', categoryRoutes);

// Authentication routes
app.use('/api/auth', authRoutes);

// Order routes
app.use('/api/orders', orderRoutes);

app.get('/api/health/db', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ message: 'Database connection successful!' });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ message: 'Database connection failed!', error: (error as Error).message });
  }
});

// Middleware de tratamento de erros global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro global do servidor:', err.stack);
  res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 