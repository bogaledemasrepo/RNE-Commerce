import { Product } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isHydrated: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: number) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  clearCart: () => void;
}

const CART_STORAGE_KEY = '@cart_items_v1';
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // 1. Rehydrate cart state from AsyncStorage on app launch
  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
          setItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Failed to load cart from storage:', error);
      } finally {
        setIsHydrated(true);
      }
    };

    loadCart();
  }, []);

  // 2. Persist cart state to AsyncStorage whenever `items` changes
  useEffect(() => {
    if (!isHydrated) return; // Prevent overwriting stored data with default empty state during load

    const saveCart = async () => {
      try {
        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Failed to save cart to storage:', error);
      }
    };

    saveCart();
  }, [items, isHydrated]);

  // Add Item or increase quantity
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

  // Remove item completely
  const removeItem = useCallback((id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  // Increment item quantity
  const incrementQuantity = useCallback((id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  }, []);

  // Decrement item quantity (removes if 0)
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

  // Compute total item count
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
      isHydrated,
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
      isHydrated,
      addItem,
      removeItem,
      incrementQuantity,
      decrementQuantity,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
