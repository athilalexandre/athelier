import { PrismaClient } from '../src/generated/prisma';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeding...');

  // Criar categoria (sem verificação de existência para garantir criação)
  const category = await prisma.category.create({
    data: {
      id: uuidv4(),
      name: 'Livros',
      description: 'Livros de diversos gêneros e autores.',
    },
  });
  console.log(`Categoria criada: ${category.name} com ID: ${category.id}`);

  // Criar produtos (livros) de exemplo
  const productsData = [
    {
      name: 'O Senhor dos Anéis',
      description: 'Um clássico da literatura fantástica, escrito por J.R.R. Tolkien.',
      price: 69.90,
      images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s',
      categoryId: category.id,
      materials: 'Capa dura, papel offset',
      dimensions: '16 x 23 cm',
      weight: 0.8,
      inspiration: 'Mitologia Nórdica',
      stockQuantity: 50,
    },
    {
      name: '1984',
      description: 'Um romance distópico de George Orwell que aborda temas de totalitarismo e vigilância.',
      price: 45.50,
      images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s',
      categoryId: category.id,
      materials: 'Capa brochura, papel jornal',
      dimensions: '14 x 21 cm',
      weight: 0.4,
      inspiration: 'Eventos políticos do século XX',
      stockQuantity: 100,
    },
    {
      name: 'Dom Quixote',
      description: 'Considerado um dos maiores trabalhos de ficção de todos os tempos, de Miguel de Cervantes.',
      price: 89.00,
      images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s',
      categoryId: category.id,
      materials: 'Capa dura, papel pólen',
      dimensions: '18 x 25 cm',
      weight: 1.2,
      inspiration: 'Cavalaria medieval',
      stockQuantity: 30,
    },
  ];

  for (const productData of productsData) {
    await prisma.product.create({ data: productData });
    console.log(`Produto criado: ${productData.name}`);
  }

  console.log('Seeding concluído.');

  // Verificação pós-seed
  const allCategories = await prisma.category.findMany();
  console.log('Categorias no banco de dados:', allCategories);

  const allProducts = await prisma.product.findMany();
  console.log('Produtos no banco de dados:', allProducts);
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 