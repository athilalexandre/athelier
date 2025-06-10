import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="py-8 lg:py-12 bg-brand-light min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto">
          <LoginForm />
          <p className="mt-8 text-center text-sm text-gray-700">
            Não tem uma conta?{' '}
            <Link to="/register" className="font-medium text-brand-primary hover:text-brand-secondary hover:underline">
              Registre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 