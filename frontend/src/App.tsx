import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProductManagementPage from './pages/AdminProductManagementPage';
import AdminCategoryManagementPage from './pages/AdminCategoryManagementPage';
import AdminOrderManagementPage from './pages/AdminOrderManagementPage';
import AdminUserManagementPage from './pages/AdminUserManagementPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/products" element={<ProductListPage />} />
              <Route path="/products/:productId" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <AdminDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/admin/products" 
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <AdminProductManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/admin/categories" 
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <AdminCategoryManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/admin/orders" 
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <AdminOrderManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/admin/users" 
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <AdminUserManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App; 