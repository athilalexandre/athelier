import React from 'react';
import { Link } from 'react-router-dom'; // Will require react-router-dom

const Header: React.FC = () => {
  return (
    <header className="bg-brand-light shadow-md py-4 sticky top-0 z-50">
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-3xl font-serif font-bold text-brand-secondary hover:text-brand-primary">
          Athelier Esmeraldo
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-brand-text hover:text-brand-primary font-medium">Home</Link>
          <Link to="/products" className="text-brand-text hover:text-brand-primary font-medium">Produtos</Link>
          <Link to="/about" className="text-brand-text hover:text-brand-primary font-medium">Sobre Nós</Link>
          <Link to="/cart" className="text-brand-text hover:text-brand-primary font-medium">Carrinho</Link>
          <Link to="/wishlist" className="text-brand-text hover:text-brand-primary font-medium">Favoritos</Link>
          {/* Later: User Account Link */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
