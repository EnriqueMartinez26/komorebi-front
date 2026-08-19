import { useState } from "react";
import { Modal } from "../ui/Modal";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";
import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH
} from "../../utils/validation";

const initialForm = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export function RegisterModal() {
  const { register } = useAuth();
  const { isRegisterOpen, closeAuthModals, openLogin } = useUI();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isRegisterOpen) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(form);
      setForm(initialForm);
    } catch (submitError) {
      if (submitError.details && Array.isArray(submitError.details)) {
        const errorMessages = submitError.details.map((errorDetail) => errorDetail.msg).join("\n");
        setError(errorMessages);
      } else {
        setError(submitError.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal title="Crear cuenta" onClose={closeAuthModals}>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-grid two-columns">
          <label>
            Nombre
            <input
              required
              value={form.firstName}
              onChange={(event) =>
                setForm((current) => ({ ...current, firstName: event.target.value }))
              }
            />
          </label>
          <label>
            Apellido
            <input
              required
              value={form.lastName}
              onChange={(event) =>
                setForm((current) => ({ ...current, lastName: event.target.value }))
              }
            />
          </label>
        </div>
        <label>
          Username
          <input
            required
            minLength={USERNAME_MIN_LENGTH}
            value={form.username}
            onChange={(event) =>
              setForm((current) => ({ ...current, username: event.target.value }))
            }
          />
        </label>
        <label>
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
          />
        </label>
        <div className="form-grid two-columns">
          <label>
            Contraseña
            <input
              type="password"
              required
              minLength={PASSWORD_MIN_LENGTH}
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({ ...current, password: event.target.value }))
              }
            />
          </label>
          <label>
            Confirmar contraseña
            <input
              type="password"
              required
              minLength={PASSWORD_MIN_LENGTH}
              value={form.confirmPassword}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  confirmPassword: event.target.value
                }))
              }
            />
          </label>
        </div>
        {error ? <p className="form-error" style={{ whiteSpace: "pre-line" }}>{error}</p> : null}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creando..." : "Registrarme"}
        </button>
        <div className="auth-links">
          <button type="button" className="link-button" onClick={openLogin}>
            Ya tengo cuenta
          </button>
        </div>
      </form>
    </Modal>
  );
}

