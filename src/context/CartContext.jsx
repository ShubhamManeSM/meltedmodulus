import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'mm_cart';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
  }, []);

  const saveCart = (newItems) => {
    setItems(newItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  };

  const showToast = useCallback((productName) => {
    setToastMessage(productName);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  }, []);

  const addItem = (product) => {
    const existingIndex = items.findIndex((item) => item.id === product.id);
    let newItems = [...items];
    if (existingIndex > -1) {
      newItems[existingIndex].qty += 1;
    } else {
      newItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1
      });
    }
    saveCart(newItems);
    showToast(product.name);
  };

  const removeItem = (productId) => {
    const newItems = items.filter((item) => item.id !== productId);
    saveCart(newItems);
  };

  const updateQty = (productId, delta) => {
    const existingIndex = items.findIndex((i) => i.id === productId);
    if (existingIndex === -1) return;

    let newItems = [...items];
    newItems[existingIndex].qty += delta;

    if (newItems[existingIndex].qty <= 0) {
      newItems = newItems.filter((item) => item.id !== productId);
    }

    saveCart(newItems);
  };

  const getTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.qty, 0);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        getTotal,
        getTotalItems,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toastMessage
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
