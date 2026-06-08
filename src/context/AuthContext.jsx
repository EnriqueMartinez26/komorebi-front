import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/AuthService";
import { useUI } from "./UIContext";

const AuthContext = createContext(null);
const STORAGE_KEY = "auth_token";

export function AuthProvider({ children }) {
  const { closeAuthModals, showToast } = useUI();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = async () => {
    const token = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.me();
      setUser(response.user);
    } catch (_error) {
      setUser(null);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshSession();
  }, []);

  const login = async (payload) => {
    const response = await authService.login(payload);
    window.localStorage.setItem(STORAGE_KEY, response.token);
    setUser(response.user);
    closeAuthModals();
    showToast("Sesion iniciada.", "success");
    return response;
  };

  const register = async (payload) => {
    const response = await authService.register(payload);
    window.localStorage.setItem(STORAGE_KEY, response.token);
    setUser(response.user);
    closeAuthModals();
    showToast("Cuenta creada.", "success");
    return response;
  };

  const logout = async () => {
    await authService.logout();
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    showToast("Sesion cerrada.", "info");
  };

  const forgotPassword = (payload) => authService.forgotPassword(payload);
  const resetPassword = (payload) => authService.resetPassword(payload);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        register,
        logout,
        refreshSession,
        forgotPassword,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
