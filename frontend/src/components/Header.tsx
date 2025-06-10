import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Ajuste o caminho se necessário

const Header: React.FC = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redireciona para a home page após o logout
  };

  return (
    <header className="bg-brand-light shadow-md py-4 sticky top-0 z-50">
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-3xl font-serif font-bold text-brand-secondary hover:text-brand-primary">
          Athelier Esmeraldo
        </Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="text-brand-text hover:text-brand-primary font-medium">Home</Link>
          <Link to="/products" className="text-brand-text hover:text-brand-primary font-medium">Produtos</Link>
          <Link to="/about" className="text-brand-text hover:text-brand-primary font-medium">Sobre Nós</Link>
          
          {/* Wishlist and Cart links - shown regardless of auth state for now, adjust if needed */}
          <Link to="/wishlist" className="text-brand-text hover:text-brand-primary font-medium">Favoritos</Link>
          <Link to="/cart" className="text-brand-text hover:text-brand-primary font-medium">Carrinho</Link>

          {isLoading ? (
            <span className="text-brand-text">Carregando...</span>
          ) : isAuthenticated && user ? (
            <>
              <span className="text-brand-text">Olá, {user.name}!</span>
              {user.role === 'ADMIN' && (
                <Link to="/admin/dashboard" className="text-brand-accent hover:text-brand-primary font-medium">Admin</Link>
              )}
              <button 
                onClick={handleLogout} 
                className="bg-brand-secondary hover:bg-brand-primary text-white font-medium py-2 px-4 rounded transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-brand-text hover:text-brand-primary font-medium">Login</Link>
              <Link to="/register" className="bg-brand-primary hover:bg-brand-secondary text-white font-medium py-2 px-4 rounded transition duration-300">
                Registrar
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;