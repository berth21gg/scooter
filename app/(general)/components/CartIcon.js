"use client";
import React, { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";

const CartIcon = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(storedCart.length);
    };

    // Inicializar el conteo del carrito
    updateCartCount();

    // Agregar listener para el evento personalizado
    window.addEventListener("cartUpdated", updateCartCount);

    // Limpiar listener al desmontar el componente
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <div className="cartMenu">
      <span className="cartCount">{cartCount}</span>
      <IoCartOutline className="cartIcon" />
    </div>
  );
};

export default CartIcon;
