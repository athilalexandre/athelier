import prisma from '../lib/prisma';

export const createProduct = async (data: any) => {
  return prisma.product.create({ data });
};

export const getProducts = async () => {
  return prisma.product.findMany({ include: { category: true } });
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