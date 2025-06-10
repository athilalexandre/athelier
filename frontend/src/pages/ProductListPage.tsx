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
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-brand-text">Carregando produtos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-text mb-2">Produtos</h1>
        <p className="text-gray-600">
          {pagination.total} produtos encontrados
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center text-gray-600 py-8">
          Nenhum produto encontrado
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.set('page', page.toString());
                    window.history.pushState({}, '', `?${newParams.toString()}`);
                  }}
                  className={`px-4 py-2 rounded-md ${
                    page === pagination.page
                      ? 'bg-brand-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
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