import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/api';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    alert(`${product.name} adicionado ao carrinho!`);
  };

  const placeholderImage = "https://via.placeholder.com/600x600.png?text=Sem+Imagem";
  const imageUrl = product.images && product.images.trim() !== '' ? product.images : placeholderImage;

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-link">
        <img
          src={imageUrl}
          alt={product.name}
          className="product-image"
          onError={(e) => (e.currentTarget.src = placeholderImage)}
        />
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