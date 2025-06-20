import * as categoryService from '../services/categoryService';
import { Request, Response } from 'express';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error: (error as Error).message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getCategories();
    console.log('Categories data from backend (controller):', categories.map(c => ({ id: c.id, name: c.name })));
    
    // Wrap the categories in a paginated response
    res.status(200).json({
      data: categories,
      total: categories.length,
      page: 1,
      limit: categories.length,
      totalPages: 1
    });
  } catch (error) {
    console.error('Error in getCategories controller:', error);
    res.status(500).json({ message: 'Erro ao buscar categorias.', error: (error as Error).message });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error: (error as Error).message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: (error as Error).message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: (error as Error).message });
  }
}; 