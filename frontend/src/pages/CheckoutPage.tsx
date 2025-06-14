import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShippingAddress, OrderPayload } from '../types/checkout';
import ShippingAddressForm from '../components/checkout/ShippingAddressForm';
import OrderSummary from '../components/checkout/OrderSummary';
import { toast } from 'react-toastify';
import { orderService } from '../services/orderService';

type CheckoutStep = 'details_input' | 'review_order';

const CheckoutPage: React.FC = () => {
  const { items, getCartSubtotal, clearCart } = useCart();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('details_input');
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
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
  };

  const handleProceedToReview = () => {
    if (!shippingAddress) {
      toast.error("Por favor, preencha o endereço de entrega.");
      return;
    }
    if (!paymentMethod) {
        toast.error("Por favor, selecione uma forma de pagamento.");
        return;
    }
    setCheckoutStep('review_order');
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress || !paymentMethod) {
        toast.error("Informações de envio ou pagamento faltando.");
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
      paymentMethod: paymentMethod,
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

      {checkoutStep === 'details_input' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ShippingAddressForm onSubmit={handleAddressSubmit} />
            <div className="mt-6 bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Forma de Pagamento</h2>
                <div className="space-y-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="credit_card"
                            checked={paymentMethod === 'credit_card'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="form-radio h-4 w-4 text-brand-primary"
                        />
                        <span className="ml-2 text-gray-700">Cartão de Crédito</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="boleto"
                            checked={paymentMethod === 'boleto'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="form-radio h-4 w-4 text-brand-primary"
                        />
                        <span className="ml-2 text-gray-700">Boleto Bancário</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="pix"
                            checked={paymentMethod === 'pix'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="form-radio h-4 w-4 text-brand-primary"
                        />
                        <span className="ml-2 text-gray-700">PIX</span>
                    </label>
                </div>
            </div>
            <button
              onClick={handleProceedToReview}
              className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? 'Processando...' : 'Pagamento e Revisão'}
            </button>
          </div>
          <div>
            <OrderSummary items={items} subtotal={getCartSubtotal()} />
          </div>
        </div>
      )}

      {checkoutStep === 'review_order' && shippingAddress && paymentMethod && (
        <div className="bg-white p-8 shadow-md rounded-lg max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-center mb-6">Revisar e Finalizar Pedido</h2>

          <div className="border-b pb-4 mb-4">
            <h3 className="text-xl font-semibold mb-2">Resumo do Pedido</h3>
            <OrderSummary items={items} subtotal={getCartSubtotal()} />
          </div>

          <div className="border-b pb-4 mb-4">
            <h3 className="text-xl font-semibold mb-2">Endereço de Entrega</h3>
            <p><strong>Nome Completo:</strong> {shippingAddress.fullName}</p>
            <p><strong>CEP:</strong> {shippingAddress.postalCode}</p>
            <p><strong>Rua:</strong> {shippingAddress.street}, {shippingAddress.number}</p>
            {shippingAddress.complement && <p><strong>Complemento:</strong> {shippingAddress.complement}</p>}
            <p><strong>Bairro:</strong> {shippingAddress.neighborhood}</p>
            <p><strong>Cidade/Estado:</strong> {shippingAddress.city}/{shippingAddress.state}</p>
            <p><strong>Telefone:</strong> {shippingAddress.phone}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Forma de Pagamento</h3>
            <p><strong>Método:</strong> {paymentMethod === 'credit_card' ? 'Cartão de Crédito' : paymentMethod === 'boleto' ? 'Boleto Bancário' : 'PIX'}</p>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCheckoutStep('details_input')}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Voltar
            </button>
            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? 'Finalizando...' : 'Finalizar Compra'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage; 