import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePageMeta } from "../../hooks/usePageMeta";
import { useAuth } from "../../context/AuthContext";

export function ForgotPasswordPage() {
  usePageMeta("Recuperar contraseña", "Flujo de recuperación de contraseña.");

  const { forgotPassword, resetPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isResetMode = Boolean(token);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback("");
    setError("");

    try {
      if (isResetMode) {
        const response = await resetPassword({
          token,
          password: form.password,
          confirmPassword: form.confirmPassword
        });
        setFeedback(response.message);
      } else {
        const response = await forgotPassword({ email: form.email });
        setFeedback(response.message);
      }
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container page-section">
      <div className="auth-page-card">
        <span className="section-eyebrow">Recuperacion</span>
        <h1>{isResetMode ? "Crear nueva contraseña" : "Recuperar contraseña"}</h1>
        <p>
          {isResetMode
            ? "Ingresá tu nueva contraseña para finalizar el proceso."
            : "Te enviaremos un enlace temporal para restablecerla."}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isResetMode ? (
            <>
              <label>
                Nueva contraseña
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      password: event.target.value
                    }))
                  }
                />
              </label>
              <label>
                Confirmar contraseña
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      confirmPassword: event.target.value
                    }))
                  }
                />
              </label>
            </>
          ) : (
            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    email: event.target.value
                  }))
                }
              />
            </label>
          )}

          {feedback ? <p className="form-success">{feedback}</p> : null}
          {error ? <p className="form-error">{error}</p> : null}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : isResetMode ? "Guardar contraseña" : "Enviar enlace"}
          </button>
        </form>
      </div>
    </section>
  );
}

