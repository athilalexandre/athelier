import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShippingAddress, OrderPayload } from '../types/checkout';
import ShippingAddressForm from '../components/checkout/ShippingAddressForm';
import OrderSummary from '../components/checkout/OrderSummary';
import { toast } from 'react-toastify';
import { orderService } from '../services/orderService';

const CheckoutPage: React.FC = () => {
  const { items, getCartSubtotal, clearCart } = useCart();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        toast.error("Você precisa estar logado para finalizar a compra.");
        navigate('/login');
        return;
      }
      if (items.length === 0) {
        toast.warn("Seu carrinho está vazio. Adicione itens antes de finalizar a compra.");
        navigate('/cart');
      }
    }
  }, [isAuthenticated, authLoading, items.length, navigate]);

  const handleAddressSubmit = (address: ShippingAddress) => {
    setShippingAddress(address);
    toast.success("Endereço de entrega salvo!");
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress) {
      toast.error("Por favor, preencha o endereço de entrega.");
      return;
    }
    if (items.length === 0) {
      toast.error("Seu carrinho está vazio.");
      navigate('/cart');
      return;
    }

    setIsLoading(true);

    const orderPayload: OrderPayload = {
      shippingAddress: shippingAddress,
      items: items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        priceAtAddition: item.priceAtAddition,
        customizationText: item.customization,
        productName: item.product.name,
      })),
      paymentMethod: "credit_card",
      subtotal: getCartSubtotal(),
      totalAmount: getCartSubtotal(),
    };

    try {
      const createdOrder = await orderService.createOrder(orderPayload);
      toast.success("Pedido realizado com sucesso!");
      clearCart();
      navigate(`/order-confirmation/${createdOrder.id}`);
    } catch (error: any) {
      toast.error(error.message || "Erro ao finalizar pedido. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return <div className="container mx-auto p-4 text-center">Carregando...</div>;
  }

  if (!isAuthenticated || items.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Finalizar Compra</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ShippingAddressForm onSubmit={handleAddressSubmit} />
        </div>
        <div>
          <OrderSummary items={items} subtotal={getCartSubtotal()} />
          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? 'Finalizando...' : 'Finalizar Pedido'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 