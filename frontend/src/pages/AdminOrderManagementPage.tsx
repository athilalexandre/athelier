import React from 'react';

const AdminOrderManagementPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 text-center py-10">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">Gerenciamento de Pedidos</h1>
      <p className="text-lg text-gray-700 mb-6">
        Aqui o administrador poderá visualizar e gerenciar os pedidos.
      </p>
      {/* Futuramente, tabela de pedidos, detalhes do pedido, atualização de status, etc. */}
      <div className="mt-8">
        <p className="text-md text-gray-500">Ferramentas de gerenciamento de pedidos serão adicionadas aqui.</p>
      </div>
    </div>
  );
};

export default AdminOrderManagementPage; 