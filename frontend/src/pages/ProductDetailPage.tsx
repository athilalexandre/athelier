import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types/api';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customizationText, setCustomizationText] = useState<string>('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('ID do produto não fornecido');
        setLoading(false);
        return;
      }
      
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

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1, customizationText);
      alert(`${product.name} adicionado ao carrinho! Customização: ${customizationText || 'Nenhuma'}`);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="animate-pulse">
            <div className="product-detail">
              <div className="bg-gray-300 h-96 rounded-lg"></div>
              <div className="space-y-6">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-12 bg-gray-300 rounded w-1/2"></div>
                <div className="h-24 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                <div className="h-12 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
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
        <div className="sticky top-24">
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

          {product.materials && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Materiais</h2>
              <p className="text-gray-700">{product.materials}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6 text-sm">
            {product.dimensions && (
              <div>
                <strong className="text-gray-800">Dimensões:</strong>
                <span className="text-gray-600 ml-2">{product.dimensions}</span>
              </div>
            )}
            {product.weight !== null && product.weight !== undefined && (
              <div>
                <strong className="text-gray-800">Peso:</strong>
                <span className="text-gray-600 ml-2">{product.weight} kg</span>
              </div>
            )}
            {product.inspiration && (
              <div>
                <strong className="text-gray-800">Inspiração:</strong>
                <span className="text-gray-600 ml-2">{product.inspiration}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            {product.stockQuantity > 0 ? (
              <p className="text-green-600 font-semibold">
                Em estoque ({product.stockQuantity} unidades disponíveis)
              </p>
            ) : (
              <p className="text-red-500 font-semibold">Fora de estoque</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="customization" className="block text-md font-semibold text-gray-800 mb-2">
              Detalhes para Customização (opcional)
            </label>
            <textarea
              id="customization"
              value={customizationText}
              onChange={(e) => setCustomizationText(e.target.value)}
              rows={3}
              placeholder="Ex: Cor específica, nome a ser gravado, ajuste de tamanho, etc."
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </div>

          <div className="product-detail-buttons">
            <button
              className="detail-button primary-button"
              disabled={product.stockQuantity === 0}
              onClick={handleAddToCart}
            >
              {product.stockQuantity > 0 ? 'Adicionar ao Carrinho' : 'Produto Indisponível'}
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