import { Product } from '@/app/types';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

// 1. Extend Product to track quantity in cart
export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: number) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Add Item or increase quantity if it already exists
  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity,
        };
        return updatedItems;
      }

      return [...prevItems, { ...product, quantity }];
    });
  }, []);

  // Remove item completely from cart
  const removeItem = useCallback((id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  // Increment item quantity by 1
  const incrementQuantity = useCallback((id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  }, []);

  // Decrement item quantity by 1 (removes item if quantity drops to 0)
  const decrementQuantity = useCallback((id: number) => {
    setItems((prevItems) =>
      prevItems
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  }, []);

  // Clear all items
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Compute total count of items (for cart badge)
  const totalItems = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  // Compute total price
  const totalPrice = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      incrementQuantity,
      decrementQuantity,
      clearCart,
    }),
    [
      items,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      incrementQuantity,
      decrementQuantity,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 2. Custom hook with provider check
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
