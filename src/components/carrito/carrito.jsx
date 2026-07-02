import React, { createContext, useState, useEffect } from 'react';

export const ContextoCarrito = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const agregarAlCarrito = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);

    setToast({ show: true, message: `¡${product.nombre} agregado al carrito! 🛒` });
  };

  const eliminarDelCarrito = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const vaciarCarrito = () => {
    setCartItems([]);
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  return (
    <ContextoCarrito.Provider
      value={{
        cartItems,
        showCart,
        setShowCart,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        toast,
        closeToast,
      }}
    >
      {children}
    </ContextoCarrito.Provider>
  );
};
