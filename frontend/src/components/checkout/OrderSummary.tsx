import React from 'react';
import { CartItem } from '../../types/cart';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, subtotal }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Resumo do Pedido</h2>
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.contentId} className="flex items-center space-x-4">
            <img
              src={item.product.images || "https://via.placeholder.com/60"}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-800">{item.product.name}</p>
              {item.customization && (
                <p className="text-sm text-gray-500">Customização: {item.customization}</p>
              )}
              <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
            </div>
            <span className="font-semibold text-gray-800">
              {formatPrice(item.priceAtAddition * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-lg font-semibold text-gray-800">
          <span>Subtotal:</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Frete:</span>
          <span>A calcular</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200 mt-2">
          <span>Total do Pedido:</span>
          <span>{formatPrice(subtotal)}</span> {/* Placeholder: Adicionar frete e impostos depois */}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary; 