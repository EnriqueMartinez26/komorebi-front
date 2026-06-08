import { createContext, useContext, useEffect, useState } from "react";
import { favoriteService } from "../services/FavoriteService";
import { useAuth } from "./AuthContext";
import { useUI } from "./UIContext";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const { showToast } = useUI();
  const [items, setItems] = useState([]);

  const refreshFavorites = async () => {
    if (!isAuthenticated) {
      setItems([]);
      return;
    }

    const response = await favoriteService.list();
    setItems(response.items);
  };

  useEffect(() => {
    if (!isLoading) {
      refreshFavorites().catch(() => setItems([]));
    }
  }, [isAuthenticated, isLoading]);

  const addFavorite = async (productId) => {
    const response = await favoriteService.add(productId);
    setItems(response.items);
    showToast("Favorito agregado.", "success");
    return response.items;
  };

  const removeFavorite = async (productId) => {
    const response = await favoriteService.remove(productId);
    setItems(response.items);
    showToast("Favorito eliminado.", "info");
    return response.items;
  };

  const isFavorite = (productId) => {
    return items.some((item) => item.id === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        items,
        favoritesCount: items.length,
        refreshFavorites,
        addFavorite,
        removeFavorite,
        isFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
}

