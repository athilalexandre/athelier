import * as productService from '../services/productService';
import { Request, Response } from 'express';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: (error as Error).message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  console.log('Received req.query in productController.getProducts:', req.query);
  try {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const search = req.query.search as string | undefined;
    const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
    const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;

    const filters: any = {};
    if (page && !isNaN(page)) filters.page = page;
    if (limit && !isNaN(limit)) filters.limit = limit;
    if (search) filters.search = search;

    filters.categoryId = (req.query.categoryId as string | undefined)?.trim() || undefined;
    console.log('CategoryId after assignment logic:', filters.categoryId);

    if (minPrice && !isNaN(minPrice)) filters.minPrice = minPrice;
    if (maxPrice && !isNaN(maxPrice)) filters.maxPrice = maxPrice;

    console.log('Constructed filters before passing to service:', filters);

    const { data, total, page: resPage, limit: resLimit, totalPages } = await productService.getProducts(filters);
    console.log('Products data from backend:', data.map(p => ({ id: p.id, name: p.name, images: p.images })));
    res.status(200).json({
      data,
      total,
      page: resPage,
      limit: resLimit,
      totalPages,
    });
  } catch (error) {
    console.error('Error in getProducts controller:', error);
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.', error: (error as Error).message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: (error as Error).message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: (error as Error).message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: (error as Error).message });
  }
}; 