import React from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="container mx-auto p-4 text-center py-10">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Pedido Recebido com Sucesso!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Obrigado pelo seu pedido! Seu número de referência é:
      </p>
      <p className="text-2xl font-bold text-blue-700 mb-8">#{orderId}</p>

      <div className="space-x-4">
        <Link to="/products" className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Continuar Comprando
        </Link>
        <Link to="/profile/orders" className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50">
          Ver Meus Pedidos
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage; 