import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="py-8 lg:py-12 bg-brand-light min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto">
          <RegisterForm />
          <p className="mt-8 text-center text-sm text-gray-700">
            Já tem uma conta?{' '}
            <Link to="/login" className="font-medium text-brand-primary hover:text-brand-secondary hover:underline">
              Faça login aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 