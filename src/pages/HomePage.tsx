import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-serif text-brand-primary mb-6">Bem-vindo ao Athelier Esmeraldo</h1>
      <p className="text-xl text-brand-secondary italic mb-12">Amor em forma de artesanato.</p>
      
      {/* Hero/Banner Section */}
      <div className="bg-brand-accent p-12 rounded-lg shadow-lg mb-16">
        <h2 className="text-3xl font-serif text-white mb-4">Coleção Destaque</h2>
        <p className="text-white mb-6">Descubra peças únicas, feitas com carinho e dedicação.</p>
        <Link to="/products" className="bg-brand-primary text-white font-semibold py-3 px-6 rounded hover:bg-brand-secondary transition duration-300">
          Ver Produtos
        </Link>
      </div>

      {/* New Arrivals Section */}
      <div>
        <h2 className="text-4xl font-serif text-brand-secondary mb-8">Novidades</h2>
        {/* Placeholder for product grid/cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example Product Card Placeholder */}
          <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="bg-gray-200 h-48 w-full mb-4 rounded"></div> {/* Image Placeholder */}
            <h3 className="font-serif text-xl text-brand-primary">Nome do Produto</h3>
            <p className="text-brand-text">R\$ 99,90</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="bg-gray-200 h-48 w-full mb-4 rounded"></div> {/* Image Placeholder */}
            <h3 className="font-serif text-xl text-brand-primary">Outro Produto</h3>
            <p className="text-brand-text">R\$ 129,90</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="bg-gray-200 h-48 w-full mb-4 rounded"></div> {/* Image Placeholder */}
            <h3 className="font-serif text-xl text-brand-primary">Mais Um Artigo</h3>
            <p className="text-brand-text">R\$ 79,90</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
