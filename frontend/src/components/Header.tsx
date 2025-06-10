import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { categoryService } from '../services/categoryService';
import { Category } from '../types/api';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await categoryService.getCategories();
        setCategories(response.data);
      } catch (err) {
        setError('Erro ao carregar categorias');
        console.error('Error fetching categories:', err);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

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

          {loading ? (
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

      {/* Categories Navigation */}
      <div className="bg-brand-secondary/10 py-2">
        <div className="container mx-auto px-6">
          {isLoadingCategories ? (
            <div className="text-center text-brand-text">Carregando categorias...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="flex flex-wrap justify-center gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-brand-primary scrollbar-track-transparent">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className="text-brand-text hover:text-brand-primary font-medium whitespace-nowrap transition-colors duration-200"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;