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
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-w-1 aspect-h-1 w-full">
          <img
            src={product.imageUrl || '/placeholder-product.jpg'}
            alt={product.name}
            className="object-cover w-full h-48"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-brand-text mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-brand-primary">
              {formatPrice(product.price)}
            </span>
            <button
              className="bg-brand-primary hover:bg-brand-secondary text-white px-4 py-2 rounded-md transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                // TODO: Implementar adição ao carrinho
              }}
            >
              Adicionar
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 