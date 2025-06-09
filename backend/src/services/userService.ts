import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';
import { Role } from '../generated/prisma';

export const createUser = async (userData: { name: string; email: string; passwordHash: string; role?: Role }) => {
  const hashedPassword = await bcrypt.hash(userData.passwordHash, 10);
  return prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      passwordHash: hashedPassword,
      role: userData.role || Role.USER,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
}; 