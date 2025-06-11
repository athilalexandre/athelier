import prisma from '../lib/prisma';
import { PaginationParams, ProductFilters } from '../types/api';

export const createProduct = async (data: any) => {
  return prisma.product.create({ data });
};

export const getProducts = async (filters?: ProductFilters) => {
  const { page = 1, limit = 12, categoryId, search, minPrice, maxPrice } = filters || {};
  const skip = (page - 1) * limit;

  const where: any = {};
  if (categoryId) {
    where.categoryId = categoryId;
  }
  if (search) {
    where.name = { contains: search, mode: 'insensitive' };
  }
  if (minPrice !== undefined) {
    where.price = { ...where.price, gte: minPrice };
  }
  if (maxPrice !== undefined) {
    where.price = { ...where.price, lte: maxPrice };
  }

  const products = await prisma.product.findMany({
    where,
    skip,
    take: limit,
    include: { category: true },
  });

  const totalProducts = await prisma.product.count({ where });

  return {
    data: products,
    total: totalProducts,
    page,
    limit,
    totalPages: Math.ceil(totalProducts / limit),
  };
};

export const getProductById = async (id: string) => {
  return prisma.product.findUnique({ where: { id }, include: { category: true } });
};

export const updateProduct = async (id: string, data: any) => {
  return prisma.product.update({ where: { id }, data });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({ where: { id } });
}; 