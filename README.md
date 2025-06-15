# Athelier Esmeraldo - E-commerce Backend & Frontend

Este projeto é uma aplicação de e-commerce completa, desenvolvida com um backend robusto em Node.js (Express com TypeScript e Prisma) e um frontend moderno em React (com TypeScript e Tailwind CSS). Ele inclui funcionalidades essenciais para uma loja online, desde a gestão de produtos e categorias até autenticação de usuários, um sistema de carrinho de compras e um fluxo de checkout detalhado.

## Funcionalidades Implementadas

### 1. Autenticação de Usuários

*   **Registro de Usuários:** Permite que novos usuários criem contas de forma segura.
*   **Login de Usuários:** Sistema de autenticação para usuários existentes.
*   **Roles (USER/ADMIN):** Diferenciação de permissões entre usuários comuns e administradores.
*   **Proteção de Rotas:** Endpoints do backend protegidos por JWT, com middlewares de autenticação e autorização por função (`authenticateToken`, `authorizeRoles`).
*   **Contexto de Autenticação (Frontend):** Gerenciamento de estado de autenticação no frontend (`AuthContext`), facilitando o acesso ao status do usuário e funções de login/logout em toda a aplicação.
*   **Recuperação de Senha:** Sistema completo de recuperação de senha com envio de e-mail e token de redefinição.
*   **Validação de E-mail:** Sistema de verificação de e-mail com envio de código de confirmação.
*   **Perfil do Usuário:** Gerenciamento de informações do usuário, incluindo foto de perfil e dados pessoais.

### 2. Gestão de Produtos

*   **Criação/Atualização/Deleção de Produtos:** Funcionalidades de CRUD completas para produtos (apenas para administradores).
*   **Listagem de Produtos:** Exibição de todos os produtos, com filtros opcionais por categoria.
*   **Detalhes do Produto:** Página dedicada para exibir informações detalhadas de um produto específico (nome, preço, descrição, estoque, dimensões, peso, materiais, inspiração).
*   **Imagens de Produtos:** Suporte para exibição de imagens dos produtos.

### 3. Gestão de Categorias

*   **Criação/Atualização/Deleção de Categorias:** Funcionalidades de CRUD completas para categorias (apenas para administradores).
*   **Listagem de Categorias:** Exibição de todas as categorias, usadas para navegação e filtragem de produtos.

### 4. Carrinho de Compras

*   **Adicionar ao Carrinho:** Permite adicionar produtos ao carrinho, com suporte para customizações e gerenciamento de quantidade.
*   **Persistência Local:** O estado do carrinho é persistido no `localStorage`, mantendo os itens mesmo após o fechamento do navegador.
*   **Remover/Atualizar Quantidade:** Funcionalidades para remover itens ou ajustar suas quantidades no carrinho.
*   **Limpar Carrinho:** Opção para esvaziar o carrinho.
*   **Subtotal e Contagem de Itens:** Cálculo dinâmico do subtotal e do número total de itens no carrinho.
*   **Página do Carrinho:** Uma página dedicada para visualizar, gerenciar e revisar os itens no carrinho antes do checkout.
*   **Notificações Toast:** Uso de `react-toastify` para fornecer feedback visual ao usuário sobre ações do carrinho (ex: "Produto adicionado ao carrinho!").

### 5. Fluxo de Checkout

*   **Definição de Tipos:** Estruturas de dados claras (`ShippingAddress`, `OrderPayload`) para o processo de checkout no frontend e backend.
*   **Formulário de Endereço de Entrega:** Componente `ShippingAddressForm` para coleta de dados de envio (nome, CPF, CEP, rua, número, complemento, bairro, cidade, estado, telefone) com validação básica.
*   **Resumo do Pedido:** Componente `OrderSummary` para exibir uma lista detalhada dos itens do carrinho e o subtotal, com placeholders para frete e total final.
*   **Página de Checkout:** Uma página de fluxo de checkout em duas colunas, integrando o formulário de endereço e o resumo do pedido.
*   **Finalização de Pedido (Lógica Inicial):** Lógica para construir o payload do pedido no frontend e enviá-lo ao backend (atualmente logado no console, pronta para integração com a API).
*   **Redirecionamento Protegido:** Redireciona usuários não autenticados ou com carrinho vazio para páginas apropriadas, com notificações Toast.

### 6. Funcionalidades de Pedido (Backend)

*   **Modelos `Order` e `OrderItem`:** Definição robusta dos modelos no Prisma Schema, incluindo o enum `OrderStatus` para gerenciar o ciclo de vida dos pedidos.
*   **Serviço de Pedidos (`orderService`):** Lógica de negócio crítica para criação de pedidos, incluindo validações rigorosas (estoque, produtos existentes), recálculo de preços no backend para segurança, e uso de transações Prisma para garantir a atomicidade (criação de pedido, itens e atualização de estoque).
*   **Controlador de Pedidos (`orderController`):** Manipula as requisições de criação de pedidos, extrai dados do usuário autenticado e lida com respostas e erros HTTP de forma detalhada.
*   **Rotas de Pedidos (`orderRoutes`):** Define a rota POST `/api/orders` para criação de pedidos, protegida por autenticação.
*   **`asyncHandler` Utility:** Utilitário para lidar com funções assíncronas do Express, garantindo o tratamento de erros e a compatibilidade de tipagem.

### 7. Sistema de Notificações

*   **Notificações em Tempo Real:** Implementação de WebSocket para notificações em tempo real.
*   **Notificações por E-mail:** Sistema de envio de e-mails para confirmações e atualizações.
*   **Notificações Push:** Suporte para notificações push no navegador.
*   **Central de Notificações:** Interface para gerenciar e visualizar todas as notificações.

### 8. Sistema de Avaliações e Comentários

*   **Avaliação de Produtos:** Sistema para usuários avaliarem produtos com estrelas e comentários.
*   **Moderação de Comentários:** Sistema de moderação para administradores.
*   **Fotos de Avaliação:** Suporte para upload de fotos nas avaliações.
*   **Respostas às Avaliações:** Possibilidade de respostas às avaliações por administradores.

### 9. Sistema de Favoritos

*   **Lista de Favoritos:** Usuários podem adicionar produtos aos favoritos.
*   **Sincronização:** Sincronização entre dispositivos através da conta do usuário.
*   **Notificações de Preço:** Alertas quando produtos favoritos têm alteração de preço.

### 10. Sistema de Cupons e Promoções

*   **Cupons de Desconto:** Sistema para criar e aplicar cupons de desconto.
*   **Promoções Automáticas:** Regras para promoções automáticas baseadas em categorias ou produtos.
*   **Programa de Fidelidade:** Sistema de pontos e recompensas para clientes frequentes.

## Tecnologias Utilizadas

**Backend:**
*   Node.js
*   Express.js
*   TypeScript
*   Prisma (ORM)
*   SQLite (Banco de Dados de Desenvolvimento)
*   Bcryptjs (Hash de Senhas)
*   jsonwebtoken (JWT para Autenticação)
*   Nodemon (Desenvolvimento)

**Frontend:**
*   React.js
*   TypeScript
*   React Router DOM
*   Tailwind CSS (Estilização)
*   Axios (Requisições HTTP)
*   react-toastify (Notificações Toast)

## Como Rodar o Projeto

### Pré-requisitos

*   Node.js (v18 ou superior)
*   npm ou yarn
*   Git

### Configuração do Backend

1.  Navegue até o diretório `backend`:
    ```bash
    cd backend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Crie um arquivo `.env` na raiz do projeto (mesmo nível de `backend` e `frontend`) e adicione as seguintes variáveis de ambiente:
    ```
    DATABASE_URL="file:./backend/prisma/dev.db"
    JWT_SECRET="sua_chave_secreta_jwt_aqui"
    # Certifique-se de que o caminho do DB está correto para o seu ambiente.
    ```
4.  Execute as migrações do Prisma e gere o cliente (isso criará o arquivo `dev.db`):
    ```bash
    npx prisma migrate dev --name init
    npx prisma migrate dev --name add-order-models # Para os modelos de pedido
    ```
5.  Opcional: Execute o seeder do Prisma para popular o banco de dados com dados de teste (se disponível):
    ```bash
    npx prisma db seed
    ```
6.  Inicie o servidor backend em modo de desenvolvimento:
    ```bash
    npm run dev
    ```
    O backend estará rodando em `http://localhost:3000` (ou na porta configurada).

### Configuração do Frontend

1.  Em uma nova janela do terminal, navegue até o diretório `frontend`:
    ```bash
    cd frontend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Instale as dependências adicionais para notificações toast (se ainda não o fez):
    ```bash
    npm install react-toastify
    npm install @types/react-toastify
    ```
4.  Crie um arquivo `.env` na raiz do diretório `frontend` e adicione a seguinte variável de ambiente:
    ```
    REACT_APP_API_BASE_URL=http://localhost:3000/api
    ```
5.  Inicie a aplicação frontend em modo de desenvolvimento:
    ```bash
    npm start
    ```
    O frontend estará rodando em `http://localhost:3001` (ou na porta padrão do Create React App).

## Contribuição

Sinta-se à vontade para explorar e estender este projeto. Contribuições são bem-vindas! (Adicionar mais detalhes sobre como contribuir, se desejar)
