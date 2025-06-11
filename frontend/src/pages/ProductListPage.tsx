import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, ProductFilters, PaginatedResponse } from '../types/api';
import { productService } from '../services/productService';
import ProductCard from '../components/products/ProductCard';

const ProductListPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 12
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const categoryId = searchParams.get('category');
        const search = searchParams.get('search');
        const page = Number(searchParams.get('page')) || 1;

        const filters: ProductFilters = {
          page,
          limit: pagination.limit,
          categoryId: categoryId || undefined,
          search: search || undefined
        };

        const response = await productService.getProducts(filters);
        setProducts(response.data);
        setPagination({
          page: response.page,
          totalPages: response.totalPages,
          total: response.total,
          limit: response.limit
        });
      } catch (err) {
        setError('Erro ao carregar produtos');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams, pagination.limit]);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Carregando produtos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="product-detail-name">Produtos</h1>
        <p className="product-category">
          {pagination.total} produtos encontrados
        </p>
      </div>

      {products.length === 0 ? (
        <div className="error">Nenhum produto encontrado</div>
      ) : (
        <>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.set('page', page.toString());
                    window.history.pushState({}, '', `?${newParams.toString()}`);
                  }}
                  className={`page-button ${page === pagination.page ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductListPage; 