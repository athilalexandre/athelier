import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/api';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const placeholderImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s";
  const imageUrl = product.images && product.images.trim() !== '' ? product.images : placeholderImage;

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-link">
        <div className="product-image-container">
          {!imageLoaded && <div className="product-image-placeholder" />}
          <img
            src={imageUrl}
            alt={product.name}
            className={`product-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = placeholderImage;
              setImageLoaded(true);
            }}
          />
        </div>
      </Link>
      <div className="product-info">
        {product.category && (
          <span className="product-category">{product.category.name}</span>
        )}
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>
        <button
          onClick={handleAddToCart}
          className="product-button"
          disabled={product.stockQuantity <= 0}
        >
          {product.stockQuantity > 0 ? 'Adicionar ao Carrinho' : 'Indisponível'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 