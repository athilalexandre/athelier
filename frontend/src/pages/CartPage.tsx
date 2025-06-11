import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateItemQuantity, clearCart, getCartSubtotal, getTotalItemsCount } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleQuantityChange = (contentId: string, delta: number) => {
    const item = cartItems.find(i => i.contentId === contentId);
    if (item) {
      updateItemQuantity(contentId, item.quantity + delta);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
        <p className="text-gray-600 mb-8">Adicione alguns produtos para começar a comprar!</p>
        <Link to="/products" className="nav-link">
          Ver Produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Seu Carrinho ({getTotalItemsCount()} {getTotalItemsCount() === 1 ? 'item' : 'itens'})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.map(item => (
            <div key={item.contentId} className="cart-item">
              <Link to={`/products/${item.product.id}`} className="cart-item-image-link">
                <img
                  src={item.product.images || "https://via.placeholder.com/100x100.png?text=Sem+Imagem"}
                  alt={item.product.name}
                  className="cart-item-image"
                />
              </Link>
              <div className="cart-item-details">
                <h2 className="cart-item-name">
                  <Link to={`/products/${item.product.id}`}>{item.product.name}</Link>
                </h2>
                {item.customization && (
                  <p className="cart-item-customization">Customização: {item.customization}</p>
                )}
                <p className="cart-item-price">{formatPrice(item.priceAtAddition)}</p>
              </div>
              <div className="cart-item-quantity-controls">
                <button onClick={() => handleQuantityChange(item.contentId, -1)} className="quantity-button">-</button>
                <span className="quantity-display">{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.contentId, 1)} className="quantity-button">+</button>
              </div>
              <div className="cart-item-subtotal">
                {formatPrice(item.priceAtAddition * item.quantity)}
              </div>
              <button onClick={() => removeFromCart(item.contentId)} className="remove-button">
                Remover
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <button onClick={clearCart} className="clear-cart-button">
              Limpar Carrinho
            </button>
            <Link to="/products" className="continue-shopping-link">
              Continuar Comprando →
            </Link>
          </div>
        </div>

        <div className="cart-summary">
          <h2 className="cart-summary-title">Resumo do Pedido</h2>
          <div className="flex justify-between items-center mb-4">
            <span className="cart-summary-label">Subtotal:</span>
            <span className="cart-summary-value">{formatPrice(getCartSubtotal())}</span>
          </div>
          {/* Adicionar frete e total final posteriormente */}
          <button className="checkout-button">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 