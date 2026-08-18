import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/AuthService";
import { setSessionExpiredHandler } from "../services/BaseHttpService";
import { useUI } from "./UIContext";
import { AUTH_TOKEN_STORAGE_KEY, UNAUTHORIZED_STATUS } from "../utils/constants";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { closeAuthModals, showToast } = useUI();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = async () => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
        : null;
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.me();
      setUser(response.user);
    } catch (error) {
      setUser(null);
      if (error.status === UNAUTHORIZED_STATUS && typeof window !== "undefined") {
        window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshSession();
  }, []);

  useEffect(() => {
    setSessionExpiredHandler(() => {
      if (typeof window === "undefined") {
        return;
      }

      if (!window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)) {
        return;
      }

      window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
      setUser(null);
      showToast("Tu sesion expiro. Volve a iniciar sesion.", "info");
    });

    return () => setSessionExpiredHandler(null);
  }, []);

  const login = async (payload) => {
    const response = await authService.login(payload);
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, response.token);
    setUser(response.user);
    closeAuthModals();
    showToast("Sesion iniciada.", "success");
    return response;
  };

  const register = async (payload) => {
    const response = await authService.register(payload);
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, response.token);
    setUser(response.user);
    closeAuthModals();
    showToast("Cuenta creada.", "success");
    return response;
  };

  const logout = async () => {
    try {
      await authService.logout();
      showToast("Sesion cerrada.", "info");
    } catch (_error) {
      showToast("Sesion cerrada en este dispositivo. El servidor no respondio.", "info");
    } finally {
      window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
      setUser(null);
    }
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
