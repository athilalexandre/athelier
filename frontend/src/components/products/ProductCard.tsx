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
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden group transition-shadow duration-300 hover:shadow-lg flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="block relative aspect-[3/4]">
        <img 
          src={imageUrl}
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          onError={(e) => (e.currentTarget.src = placeholderImage)}
        />
      </Link>
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {product.category && (
          <Link 
            to={`/products?categoryId=${product.categoryId}`} 
            className="text-xs text-brand-secondary hover:text-brand-primary uppercase tracking-wider font-medium mb-1 block"
          >
            {product.category.name}
          </Link>
        )}
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg sm:text-xl font-serif text-brand-text group-hover:text-brand-primary transition-colors duration-300 truncate h-14 sm:h-16" title={product.name}>
            {product.name}
          </h3>
        </Link>
        <p className="text-base sm:text-lg font-semibold text-brand-primary mt-2 mb-4">
          {formatPrice(product.price)}
        </p>
        <div className="mt-auto">
          <Link 
            to={`/product/${product.id}`} 
            className="inline-block w-full text-center bg-transparent border-2 border-brand-primary text-brand-primary py-2 px-4 rounded-md hover:bg-brand-primary hover:text-white transition-all duration-300 ease-in-out text-sm font-medium transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 