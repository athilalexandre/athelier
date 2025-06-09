import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-serif text-brand-primary mb-4">404</h1>
      <h2 className="text-3xl font-serif text-brand-secondary mb-8">Página Não Encontrada</h2>
      <p className="text-brand-text mb-8">
        Oops! A página que você está procurando não existe ou foi movida.
      </p>
      <Link to="/" className="bg-brand-primary text-white font-semibold py-3 px-6 rounded hover:bg-brand-secondary transition duration-300">
        Voltar para Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
