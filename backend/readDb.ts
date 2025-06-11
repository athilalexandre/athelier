import { PrismaClient } from './src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Consultando categorias...');
    const categories = await prisma.category.findMany();
    console.log('Categorias encontradas:', categories);

    console.log('Consultando produtos...');
    const products = await prisma.product.findMany();
    console.log('Produtos encontrados:', products);

  } catch (e) {
    console.error('Erro ao consultar o banco de dados:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 