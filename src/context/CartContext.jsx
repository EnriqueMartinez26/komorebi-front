import { createContext, useContext, useEffect, useState } from "react";
import { cartService } from "../services/CartService";
import { useAuth } from "./AuthContext";
import { useUI } from "./UIContext";

const CartContext = createContext(null);

const emptyCart = { items: [], total: 0 };

export function CartProvider({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const { showToast } = useUI();
  const [cart, setCart] = useState(emptyCart);

  const refreshCart = async () => {
    if (!isAuthenticated) {
      setCart(emptyCart);
      return;
    }

    const response = await cartService.getCart();
    setCart(response.cart);
  };

  useEffect(() => {
    if (!isLoading) {
      refreshCart().catch(() => {
        setCart(emptyCart);
      });
    }
  }, [isAuthenticated, isLoading]);

  const runMutation = async (mutation) => {
    try {
      return await mutation();
    } catch (error) {
      showToast(error.message, "error");
      throw error;
    }
  };

  const addItem = (productId, quantity = 1) =>
    runMutation(async () => {
      const response = await cartService.addItem({ productId, quantity });
      setCart(response.cart);
      showToast("Producto agregado al carrito.", "success");
      return response.cart;
    });

  const updateItem = (itemId, quantity) =>
    runMutation(async () => {
      const response = await cartService.updateItem(itemId, { quantity });
      setCart(response.cart);
      return response.cart;
    });

  const removeItem = (itemId) =>
    runMutation(async () => {
      const response = await cartService.removeItem(itemId);
      setCart(response.cart);
      showToast("Producto eliminado del carrito.", "info");
    });

  const clearCart = () =>
    runMutation(async () => {
      const response = await cartService.clear();
      setCart(response.cart);
      showToast("Carrito vaciado.", "info");
    });

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount: cart.items.reduce((acc, item) => acc + item.quantity, 0),
        refreshCart,
        addItem,
        updateItem,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

