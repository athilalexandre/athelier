import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types/api';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customizationText, setCustomizationText] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState(false);
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
      toast.success(`${product.name} adicionado ao carrinho! Customização: ${customizationText || 'Nenhuma'}`);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="product-detail">
            <div className="product-detail-image-placeholder"></div>
            <div className="product-detail-info-placeholder">
              <div className="placeholder-line"></div>
              <div className="placeholder-line"></div>
              <div className="placeholder-line"></div>
              <div className="placeholder-line"></div>
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

  const placeholderImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s";
  const imageUrl = product.images && product.images.trim() !== '' ? product.images : placeholderImage;

  return (
    <div className="container">
      <div className="mb-4">
        <Link to="/products" className="nav-link">
          ← Voltar para produtos
        </Link>
      </div>

      <div className="product-detail">
        <div className="product-detail-image-container">
          {!imageLoaded && <div className="product-detail-image-placeholder" />}
          <img
            src={imageUrl}
            alt={product.name}
            className={`product-detail-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = placeholderImage;
              setImageLoaded(true);
            }}
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
            <div className="product-detail-section">
              <h2 className="product-detail-section-title">Materiais</h2>
              <p className="product-detail-section-content">{product.materials}</p>
            </div>
          )}

          <div className="product-detail-specs">
            {product.dimensions && (
              <div className="product-detail-spec">
                <strong>Dimensões:</strong>
                <span>{product.dimensions}</span>
              </div>
            )}
            {product.weight !== null && product.weight !== undefined && (
              <div className="product-detail-spec">
                <strong>Peso:</strong>
                <span>{product.weight} kg</span>
              </div>
            )}
            {product.inspiration && (
              <div className="product-detail-spec">
                <strong>Inspiração:</strong>
                <span>{product.inspiration}</span>
              </div>
            )}
          </div>

          <div className="product-detail-stock">
            {product.stockQuantity > 0 ? (
              <p className="product-detail-stock-available">
                Em estoque ({product.stockQuantity} unidades disponíveis)
              </p>
            ) : (
              <p className="product-detail-stock-unavailable">Fora de estoque</p>
            )}
          </div>

          <div className="product-detail-customization">
            <label htmlFor="customization" className="product-detail-label">
              Detalhes para Customização (opcional)
            </label>
            <textarea
              id="customization"
              value={customizationText}
              onChange={(e) => setCustomizationText(e.target.value)}
              rows={3}
              placeholder="Ex: Cor específica, nome a ser gravado, ajuste de tamanho, etc."
              className="product-detail-textarea"
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