import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product } from '../types/api';
import { CartItem /*, CartState */ } from '../types/cart'; // Removido CartState pois não é usado diretamente aqui

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, customization?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateItemQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  getCartItems: () => CartItem[];
  getCartSubtotal: () => number;
  getTotalItemsCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'cartItems';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart items to localStorage:", error);
    }
  }, [items]);

  const generateContentId = useCallback((productId: string, customization?: string) => {
    return customization ? `${productId}-${btoa(customization)}` : productId;
  }, []);

  const addToCart = useCallback((product: Product, quantity: number, customization?: string) => {
    setItems((prevItems) => {
      const contentId = generateContentId(product.id, customization);
      const existingItemIndex = prevItems.findIndex((item) => item.contentId === contentId);

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        const newItem: CartItem = {
          contentId,
          product,
          quantity,
          customization,
          priceAtAddition: product.price, // Assuming product.price is available
        };
        return [...prevItems, newItem];
      }
    });
  }, [generateContentId]);

  const removeFromCart = useCallback((cartItemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.contentId !== cartItemId));
  }, []);

  const updateItemQuantity = useCallback((cartItemId: string, newQuantity: number) => {
    setItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item.contentId !== cartItemId);
      }
      return prevItems.map((item) =>
        item.contentId === cartItemId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getCartItems = useCallback(() => items, [items]);

  const getCartSubtotal = useCallback(() => {
    return items.reduce((total, item) => total + item.priceAtAddition * item.quantity, 0);
  }, [items]);

  const getTotalItemsCount = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
        getCartItems,
        getCartSubtotal,
        getTotalItemsCount,
      }}
    >
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