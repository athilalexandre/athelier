import prisma from '../lib/prisma';

export const createCategory = async (data: { name: string; description?: string; imageUrl?: string }) => {
  return prisma.category.create({ data });
};

export const getCategories = async () => {
  return prisma.category.findMany();
};

export const getCategoryById = async (id: string) => {
  return prisma.category.findUnique({ where: { id } });
};

export const updateCategory = async (id: string, data: { name?: string; description?: string; imageUrl?: string }) => {
  return prisma.category.update({ where: { id }, data });
};

export const deleteCategory = async (id: string) => {
  return prisma.category.delete({ where: { id } });
}; 