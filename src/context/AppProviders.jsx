import { UIProvider } from "./UIContext";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { FavoritesProvider } from "./FavoritesContext";

export function AppProviders({ children }) {
  return (
    <UIProvider>
      <AuthProvider>
        <FavoritesProvider>
          <CartProvider>{children}</CartProvider>
        </FavoritesProvider>
      </AuthProvider>
    </UIProvider>
  );
}

