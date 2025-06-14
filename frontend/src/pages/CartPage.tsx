import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateItemQuantity, clearCart, getCartSubtotal, getTotalItemsCount } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Seu Carrinho</h1>

      {items.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">Seu carrinho está vazio.</p>
          <Link to="/products" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Continuar Comprando
          </Link>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Produto</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Preço Unitário</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Quantidade</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Total</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.contentId} className="border-b last:border-0">
                    <td className="py-4 px-4 flex items-center">
                      <img src={item.product.images || "https://via.placeholder.com/60"} alt={item.product.name} className="w-16 h-16 object-cover rounded mr-4" />
                      <div>
                        <Link to={`/products/${item.product.id}`} className="font-medium text-gray-800 hover:text-blue-600">{item.product.name}</Link>
                        {item.customization && (
                          <p className="text-sm text-gray-500 mt-1">Customização: {item.customization}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{formatPrice(item.priceAtAddition)}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateItemQuantity(item.contentId, item.quantity - 1)}
                          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l hover:bg-gray-300 focus:outline-none"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItemQuantity(item.contentId, parseInt(e.target.value))}
                          className="w-16 text-center border-t border-b border-gray-200 py-1 focus:outline-none"
                          min="1"
                        />
                        <button
                          onClick={() => updateItemQuantity(item.contentId, item.quantity + 1)}
                          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r hover:bg-gray-300 focus:outline-none"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{formatPrice(item.priceAtAddition * item.quantity)}</td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => removeFromCart(item.contentId)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-6 p-4 bg-white rounded-lg shadow-md">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-semibold">Total de Itens: {getTotalItemsCount()}</p>
              <p className="text-xl font-bold">Subtotal: {formatPrice(getCartSubtotal())}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Limpar Carrinho
              </button>
              <Link to="/checkout">
                <button
                  className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  Finalizar Compra
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 