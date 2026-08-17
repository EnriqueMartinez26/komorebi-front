import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "../components/ui/Loader";
import { useAuth } from "../context/AuthContext";
import { useUI } from "../context/UIContext";

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const { openLogin, showToast } = useUI();

  useEffect(() => {
    if (isLoading || isAuthenticated) {
      return;
    }

    showToast("Inicia sesion para acceder a esta seccion.", "info");
    openLogin();
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return <Loader label="Verificando sesion..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
