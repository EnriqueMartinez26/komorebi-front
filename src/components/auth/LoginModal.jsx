import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal } from "../ui/Modal";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";

export function LoginModal() {
  const { login } = useAuth();
  const { isLoginOpen, closeAuthModals, openRegister } = useUI();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoginOpen) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(form);
      setForm({ identifier: "", password: "" });
    } catch (submitError) {
      if (submitError.details && Array.isArray(submitError.details)) {
        const errorMessages = submitError.details.map((d) => d.msg).join("\n");
        setError(errorMessages);
      } else {
        setError(submitError.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal title="Iniciar sesión" onClose={closeAuthModals}>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email o username
          <input
            value={form.identifier}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                identifier: event.target.value
              }))
            }
            placeholder="tu@email.com"
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm((current) => ({ ...current, password: event.target.value }))
            }
            placeholder="********"
          />
        </label>
        {error ? <p className="form-error" style={{ whiteSpace: "pre-line" }}>{error}</p> : null}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </button>
        <div className="auth-links">
          <button type="button" className="link-button" onClick={openRegister}>
            Crear cuenta
          </button>
          <Link to="/forgot-password">Recuperar contraseña</Link>
        </div>
      </form>
    </Modal>
  );
}
