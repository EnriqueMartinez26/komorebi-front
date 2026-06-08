import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";

export function ProtectedAction({ children, onAction }) {
  const { isAuthenticated } = useAuth();
  const { openLogin } = useUI();

  const execute = async (...args) => {
    if (!isAuthenticated) {
      openLogin();
      return false;
    }

    await onAction(...args);
    return true;
  };

  return children({ execute, isAuthenticated });
}

