import { PrismaClient, Prisma } from '../generated/prisma';
import { BackendCartItem, BackendShippingAddress, CreateOrderPayload } from '../types/order'; // Importar tipos do backend

const prisma = new PrismaClient();

export const orderService = {
  createOrder: async (userId: string, orderData: CreateOrderPayload) => {
    const { shippingAddress, items, paymentMethod, paymentTransactionId } = orderData;

    if (!items || items.length === 0) {
      throw new Error("O carrinho está vazio.");
    }

    // Validação Crítica e Recálculo no Backend para evitar manipulação de preços
    const productIds = items.map(item => item.productId);
    const productsInDb = await prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
    });

    if (productsInDb.length !== productIds.length) {
      throw new Error("Um ou mais produtos no carrinho não foram encontrados.");
    }

    let calculatedSubtotal = 0;
    const orderItemsToCreate: Prisma.OrderItemCreateManyOrderInput[] = [];
    const productUpdates: Array<[string, number]> = []; // [productId, newStockQuantity]

    for (const item of items) {
      const dbProduct = productsInDb.find(p => p.id === item.productId);

      if (!dbProduct) {
        throw new Error(`Produto ${item.productName} não encontrado no banco de dados.`);
      }

      if (dbProduct.stockQuantity < item.quantity) {
        throw new Error(`Estoque insuficiente para o produto: ${item.productName}. Disponível: ${dbProduct.stockQuantity}, Requisitado: ${item.quantity}`);
      }

      // Usar o preço do banco de dados para o cálculo final
      const priceAtPurchase = dbProduct.price;
      calculatedSubtotal += priceAtPurchase * item.quantity;

      orderItemsToCreate.push({
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: priceAtPurchase,
        customizationText: item.customizationText,
      });

      productUpdates.push([dbProduct.id, dbProduct.stockQuantity - item.quantity]);
    }

    // Usar uma transação Prisma para garantir atomicidade
    const order = await prisma.$transaction(async (tx) => {
      // 1. Criar a Ordem
      const newOrder = await tx.order.create({
        data: {
          userId,
          orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Simples, pode ser melhorado
          status: "PENDING",
          totalAmount: calculatedSubtotal, // Frete e impostos podem ser adicionados depois
          shippingFullName: shippingAddress.fullName,
          shippingPostalCode: shippingAddress.postalCode,
          shippingStreet: shippingAddress.street,
          shippingNumber: shippingAddress.number,
          shippingComplement: shippingAddress.complement,
          shippingNeighborhood: shippingAddress.neighborhood,
          shippingCity: shippingAddress.city,
          shippingState: shippingAddress.state,
          shippingPhone: shippingAddress.phone,
          paymentMethod: paymentMethod,
          paymentTransactionId: paymentTransactionId,
          items: {
            createMany: {
              data: orderItemsToCreate,
            },
          },
        },
        include: {
          items: { // Incluir os itens para retornar o pedido completo
            include: {
              product: true, // Incluir detalhes do produto nos itens do pedido
            },
          },
        },
      });

      // 2. Decrementar o estoque dos produtos
      for (const [productId, newStock] of productUpdates) {
        await tx.product.update({
          where: { id: productId },
          data: { stockQuantity: newStock },
        });
      }

      return newOrder;
    });

    return order;
  },
}; 