'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Kosárba rakás logikája
  const addToCart = (item) => {
    setCartItems((prev) => {
      // Egyedi ID generálása a törléshez
      const newItem = { ...item, internalId: Date.now() + Math.random() };
      return [...prev, newItem];
    });
    setIsCartOpen(true); // Kinyitjuk a kosarat, ha beletett valamit
  };

  // Törlés a kosárból
  const removeFromCart = (internalId) => {
    setCartItems((prev) => prev.filter((item) => item.internalId !== internalId));
  };

  // Kosár ürítése rendelés után
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);