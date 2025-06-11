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
      <div className="container">
        <div className="loading">Carregando produto...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container">
        <div className="error">
          {error || 'Produto não encontrado'}
        </div>
        <div className="text-center mt-4">
          <Link to="/products" className="nav-link">
            Voltar para lista de produtos
          </Link>
        </div>
      </div>
    );
  }

  const placeholderImage = "https://via.placeholder.com/800x1000.png?text=Sem+Imagem";
  const imageUrl = product.images && product.images.trim() !== '' ? product.images : placeholderImage;

  return (
    <div className="container">
      <div className="mb-4">
        <Link to="/products" className="nav-link">
          ← Voltar para produtos
        </Link>
      </div>

      <div className="product-detail">
        <div>
          <img
            src={imageUrl}
            alt={product.name}
            className="product-detail-image"
            onError={(e) => (e.currentTarget.src = placeholderImage)}
          />
        </div>

        <div className="product-detail-info">
          {product.category && (
            <Link
              to={`/products?categoryId=${product.categoryId}`}
              className="product-category"
            >
              {product.category.name}
            </Link>
          )}

          <h1 className="product-detail-name">
            {product.name}
          </h1>

          <p className="product-detail-price">
            {formatPrice(product.price)}
          </p>

          <div className="product-detail-description">
            <p>{product.description}</p>
          </div>

          <div className="product-detail-buttons">
            <button
              className="detail-button primary-button"
              onClick={() => {
                // TODO: Implementar adição ao carrinho
              }}
            >
              Adicionar ao Carrinho
            </button>

            <button
              className="detail-button secondary-button"
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