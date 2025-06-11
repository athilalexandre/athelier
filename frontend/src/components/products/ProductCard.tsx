import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/api';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const placeholderImage = "https://via.placeholder.com/300x400.png?text=Sem+Imagem";
  const imageUrl = product.images && product.images.trim() !== '' ? product.images : placeholderImage;

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img 
          src={imageUrl}
          alt={product.name} 
          className="product-image"
          onError={(e) => (e.currentTarget.src = placeholderImage)}
        />
      </Link>
      <div className="product-info">
        {product.category && (
          <Link 
            to={`/products?categoryId=${product.categoryId}`} 
            className="product-category"
          >
            {product.category.name}
          </Link>
        )}
        <Link to={`/product/${product.id}`}>
          <h3 className="product-name" title={product.name}>
            {product.name}
          </h3>
        </Link>
        <p className="product-price">
          {formatPrice(product.price)}
        </p>
        <Link 
          to={`/product/${product.id}`} 
          className="product-button"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

export default ProductCard; 