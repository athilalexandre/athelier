import React from 'react';

const AdminCategoryManagementPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 text-center py-10">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">Gerenciamento de Categorias</h1>
      <p className="text-lg text-gray-700 mb-6">
        Aqui o administrador poderá criar, editar e remover categorias.
      </p>
      {/* Futuramente, tabela de categorias, formulários de edição/criação, etc. */}
      <div className="mt-8">
        <p className="text-md text-gray-500">Ferramentas de gerenciamento de categorias serão adicionadas aqui.</p>
      </div>
    </div>
  );
};

export default AdminCategoryManagementPage; 