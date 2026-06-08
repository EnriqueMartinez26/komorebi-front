import { usePageMeta } from "../../hooks/usePageMeta";
import { Link } from "react-router-dom";
import { Icon } from "../../components/ui/Icon";

export function HelpPage() {
  usePageMeta(
    "Ayuda | Komorebi Home",
    "Preguntas frecuentes y asistencia para compras en Komorebi Home."
  );

  const faqs = [
    {
      question: "¿Cómo realizo una compra?",
      answer:
        "Navegá por nuestro catálogo, agregá los productos que te gusten al carrito y completá el proceso de pago desde la página de carrito. Podés pagar con tarjeta o elegir envío por MercadoLibre."
    },
    {
      question: "¿Cuánto tarda el envío?",
      answer:
        "El envío estándar demora entre 5 y 10 días hábiles. El envío express llega en 2 a 3 días hábiles. Los envíos por MercadoLibre siguen los tiempos propios de su logística."
    },
    {
      question: "¿Puedo devolver un producto?",
      answer:
        "Sí. Aceptamos cambios y devoluciones dentro de los 30 días posteriores a la compra. El producto debe estar sin uso y en su embalaje original. Escribinos a hola@komorebihome.dev para iniciar el proceso."
    },
    {
      question: "¿Cómo agrego productos a favoritos?",
      answer:
        "Hacé clic en el ícono de corazón en cada tarjeta de producto. Necesitás tener sesión iniciada para guardar tus favoritos."
    },
    {
      question: "¿Los precios incluyen IVA?",
      answer:
        "Sí, todos los precios publicados en el sitio incluyen IVA y son en pesos argentinos."
    },
    {
      question: "¿Cómo recupero mi contraseña?",
      answer:
        "Podés recuperarla desde el formulario de ingreso haciendo clic en '¿Olvidaste tu contraseña?', o directamente desde la página de recuperación."
    },
    {
      question: "¿Puedo comprar sin registrarme?",
      answer:
        "Podés navegar el catálogo sin cuenta, pero para agregar al carrito, guardar favoritos y finalizar una compra necesitás registrarte. El proceso es rápido y gratuito."
    }
  ];

  return (
    <section className="container page-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Soporte</span>
          <h1>Centro de Ayuda</h1>
        </div>
        <Link to="/contacto" className="secondary-button">
          <Icon name="help" />
          Contactar
        </Link>
      </div>

      <div className="help-intro">
        <p>
          Encontrá respuesta a las consultas más frecuentes. Si no encontrás lo que buscás,
          escribinos directamente a{" "}
          <a href="mailto:hola@komorebihome.dev" className="help-link">
            hola@komorebihome.dev
          </a>{" "}
          o por WhatsApp al <strong>+54 11 5555 5555</strong>.
        </p>
      </div>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <details key={index} className="faq-item">
            <summary className="faq-question">
              <span>{faq.question}</span>
              <Icon name="arrowRight" className="faq-chevron" />
            </summary>
            <p className="faq-answer">{faq.answer}</p>
          </details>
        ))}
      </div>

      <div className="help-contact-strip">
        <div>
          <strong>¿Necesitás más ayuda?</strong>
          <p>Nuestro equipo responde en horario de lunes a viernes de 9 a 18 hs.</p>
        </div>
        <Link to="/contacto" className="secondary-button">
          Ir al formulario de contacto
        </Link>
      </div>
    </section>
  );
}
