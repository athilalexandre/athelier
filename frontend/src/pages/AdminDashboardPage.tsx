import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 py-10">
      <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">Painel de Administração</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/products" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Gerenciar Produtos</h2>
          <p className="text-gray-600">Adicione, edite ou remova produtos.</p>
        </Link>
        
        <Link to="/admin/categories" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Gerenciar Categorias</h2>
          <p className="text-gray-600">Crie, edite ou exclua categorias.</p>
        </Link>

        <Link to="/admin/orders" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Gerenciar Pedidos</h2>
          <p className="text-gray-600">Visualize e gerencie os pedidos dos clientes.</p>
        </Link>

        <Link to="/admin/users" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Gerenciar Usuários</h2>
          <p className="text-gray-600">Administre as contas de usuário.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage; 