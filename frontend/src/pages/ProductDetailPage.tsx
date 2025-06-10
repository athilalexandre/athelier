import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types/api';
import { productService } from '../services/productService';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Erro ao carregar produto');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-brand-text">Carregando produto...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          {error || 'Produto não encontrado'}
        </div>
        <div className="text-center mt-4">
          <Link to="/products" className="text-brand-primary hover:text-brand-secondary">
            Voltar para lista de produtos
          </Link>
        </div>
      </div>
    );
  }

  const placeholderImage = "https://via.placeholder.com/800x1000.png?text=Sem+Imagem";
  const imageUrl = product.images && product.images.trim() !== '' ? product.images : placeholderImage;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link to="/products" className="text-brand-primary hover:text-brand-secondary">
          ← Voltar para produtos
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagem do Produto */}
        <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = placeholderImage)}
          />
        </div>

        {/* Detalhes do Produto */}
        <div className="flex flex-col">
          {product.category && (
            <Link
              to={`/products?categoryId=${product.categoryId}`}
              className="text-sm text-brand-secondary hover:text-brand-primary uppercase tracking-wider font-medium mb-2"
            >
              {product.category.name}
            </Link>
          )}

          <h1 className="text-3xl font-serif text-brand-text mb-4">
            {product.name}
          </h1>

          <p className="text-2xl font-semibold text-brand-primary mb-6">
            {formatPrice(product.price)}
          </p>

          <div className="prose prose-sm text-gray-600 mb-8">
            <p>{product.description}</p>
          </div>

          <div className="mt-auto space-y-4">
            <button
              className="w-full bg-brand-primary hover:bg-brand-secondary text-white py-3 px-6 rounded-md transition-colors duration-300 font-medium"
              onClick={() => {
                // TODO: Implementar adição ao carrinho
              }}
            >
              Adicionar ao Carrinho
            </button>

            <button
              className="w-full bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white py-3 px-6 rounded-md transition-all duration-300 font-medium"
              onClick={() => {
                // TODO: Implementar adição aos favoritos
              }}
            >
              Adicionar aos Favoritos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 