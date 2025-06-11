import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/api';
import { CartItem, CartState } from '../types/cart';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, customization?: string) => void;
  removeFromCart: (contentId: string) => void;
  updateItemQuantity: (contentId: string, newQuantity: number) => void;
  clearCart: () => void;
  getCartSubtotal: () => number;
  getTotalItemsCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'ecommerce_cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart).items : [];
    } catch (error) {
      console.error('Erro ao carregar carrinho do localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items: cartItems }));
    } catch (error) {
      console.error('Erro ao salvar carrinho no localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number, customization?: string) => {
    setCartItems(prevItems => {
      const contentId = `${product.id}-${customization || 'no-customization'}`;
      const existingItem = prevItems.find(item => item.contentId === contentId);

      if (existingItem) {
        return prevItems.map(item =>
          item.contentId === contentId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          contentId,
          product,
          quantity,
          customization,
          priceAtAddition: product.price,
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (contentId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.contentId !== contentId));
  };

  const updateItemQuantity = (contentId: string, newQuantity: number) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => item.contentId !== contentId);
      }
      return prevItems.map(item =>
        item.contentId === contentId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.priceAtAddition * item.quantity), 0);
  };

  const getTotalItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    getCartSubtotal,
    getTotalItemsCount,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 