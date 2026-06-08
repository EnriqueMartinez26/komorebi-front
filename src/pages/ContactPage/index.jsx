import { useState } from "react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { contactService } from "../../services/ContactService";

export function ContactPage() {
  usePageMeta("Contacto", "Canales de contacto del e-commerce.");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback("");
    setError("");

    try {
      const response = await contactService.send(form);
      setFeedback(response.message);
      setForm({ name: "", email: "", message: "" });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container page-section contact-layout">
      <div>
        <span className="section-eyebrow">Contacto</span>
        <h1>Hablemos</h1>
        <p>
          Canal de contacto base listo para email, WhatsApp o integracion con mapa en
          una siguiente iteracion.
        </p>
        <ul className="detail-meta">
          <li>Email: hola@komorebihome.dev</li>
          <li>WhatsApp: +54 11 5555 5555</li>
          <li>Horario: Lunes a Viernes de 9 a 18 hs</li>
        </ul>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
          />
        </label>
        <label>
          Mensaje
          <textarea
            rows="5"
            value={form.message}
            onChange={(event) =>
              setForm((current) => ({ ...current, message: event.target.value }))
            }
          />
        </label>
        {feedback ? <p className="form-success">{feedback}</p> : null}
        {error ? <p className="form-error">{error}</p> : null}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar consulta"}
        </button>
      </form>
    </section>
  );
}

