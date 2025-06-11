import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeding...');

  // Criar categoria se não existir
  let category = await prisma.category.findUnique({
    where: { name: 'Livros' },
  });

  if (!category) {
    category = await prisma.category.create({
      data: {
        id: uuidv4(),
        name: 'Livros',
        description: 'Livros de diversos gêneros e autores.',
      },
    });
    console.log(`Categoria criada: ${category.name}`);
  } else {
    console.log(`Categoria '${category.name}' já existe.`);
  }

  // Criar produtos (livros) de exemplo
  const productsData = [
    {
      name: 'O Senhor dos Anéis',
      description: 'Um clássico da literatura fantástica, escrito por J.R.R. Tolkien.',
      price: 69.90,
      images: 'https://images-na.ssl-images-amazon.com/images/I/71jY3qgSZeL.jpg',
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
      images: 'https://images-na.ssl-images-amazon.com/images/I/71RPxP+a-gL.jpg',
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
      images: 'https://images-na.ssl-images-amazon.com/images/I/51r-xGg2GgL.jpg',
      categoryId: category.id,
      materials: 'Capa dura, papel pólen',
      dimensions: '18 x 25 cm',
      weight: 1.2,
      inspiration: 'Cavalaria medieval',
      stockQuantity: 30,
    },
  ];

  for (const productData of productsData) {
    // Verifica se o produto já existe pelo nome para evitar duplicatas
    const existingProduct = await prisma.product.findUnique({
      where: { name: productData.name },
    });

    if (!existingProduct) {
      await prisma.product.create({ data: productData });
      console.log(`Produto criado: ${productData.name}`);
    } else {
      console.log(`Produto '${productData.name}' já existe.`);
    }
  }

  console.log('Seeding concluído.');
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 