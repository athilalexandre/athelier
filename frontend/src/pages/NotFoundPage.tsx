import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container text-center py-12">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Página Não Encontrada</p>
      <Link to="/" className="nav-link">
        Voltar para a Página Inicial
      </Link>
    </div>
  );
};

export default NotFoundPage; 