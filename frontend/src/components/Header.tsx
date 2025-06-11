import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { categoryService } from '../services/categoryService';
import { Category } from '../types/api';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const { getTotalItemsCount } = useCart();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await categoryService.getCategories();
        console.log('API Response for categories (this is actually the array):', response);
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
    navigate('/');
  };

  const cartItemCount = getTotalItemsCount();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            Athelier Esmeraldo
          </Link>
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Produtos</Link>
            <Link to="/about" className="nav-link">Sobre Nós</Link>
            <Link to="/wishlist" className="nav-link">Favoritos</Link>
            <Link to="/cart" className="nav-link">Carrinho ({cartItemCount})</Link>

            {loading ? (
              <span className="loading">Carregando...</span>
            ) : isAuthenticated && user ? (
              <>
                <span className="nav-link">Olá, {user.name}!</span>
                {user.role === 'ADMIN' && (
                  <Link to="/admin/dashboard" className="nav-link">Admin</Link>
                )}
                <button 
                  onClick={handleLogout} 
                  className="detail-button primary-button"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="detail-button primary-button">
                  Registrar
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Categories Navigation */}
        <div className="nav-links" style={{ padding: '0.5rem 0' }}>
          {isLoadingCategories ? (
            <div className="loading">Carregando categorias...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="nav-link"
              >
                {category.name}
              </Link>
            ))
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;