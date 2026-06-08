import { usePageMeta } from "../../hooks/usePageMeta";
import { Link } from "react-router-dom";

export function AboutPage() {
  usePageMeta(
    "Quiénes Somos | Komorebi Home",
    "Conocé la historia y los valores detrás de Komorebi Home."
  );

  return (
    <section className="container page-section">
      <div className="about-hero">
        <span className="section-eyebrow">Nuestra historia</span>
        <h1>Quiénes Somos</h1>
        <p className="about-tagline">
          Objetos simples para rituales cotidianos. Menos ruido visual. Más calma en casa.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-text">
          <h2>Un proyecto nacido del caos urbano</h2>
          <p>
            Komorebi nació de una necesidad real: vivir en un departamento pequeño sin que
            se sienta abarrotado. Buscábamos objetos que fueran bonitos <em>y</em> útiles,
            que ocuparan su lugar con intención y no por inercia. Que al mirarlos, en lugar
            de generar más ruido visual, generaran calma.
          </p>
          <p>
            No encontramos esa tienda, así que la creamos.
          </p>
          <h2>Japandi como filosofía de vida</h2>
          <p>
            El estilo Japandi no es solo una tendencia de diseño: es la fusión del
            minimalismo japonés (<em>wabi-sabi</em>) con la calidez escandinava
            (<em>hygge</em>). Significa encontrar belleza en lo imperfecto, valorar lo
            artesanal y construir espacios que inviten a respirar profundo.
          </p>
          <p>
            Curada desde Argentina, nuestra selección prioriza materiales nobles como la
            madera, el lino, el bambú, la cerámica y las fibras naturales. Cada producto
            fue elegido porque combina función y belleza sin excesos.
          </p>
          <h2>Curaduría, no catálogo</h2>
          <p>
            No vendemos de todo. Vendemos lo necesario, muy bien elegido, para que todo
            combine entre sí. Nuestro modelo es el de una revista de diseño hecha tienda:
            te ahorramos la búsqueda y te garantizamos coherencia visual y estética en
            cada rincón de tu hogar.
          </p>
        </div>

        <div className="about-values">
          <h3>Lo que nos guía</h3>
          <ul className="values-list">
            <li>
              <strong>Funcionalidad</strong>
              <span>Cada objeto tiene un propósito claro. No decoramos por decorar.</span>
            </li>
            <li>
              <strong>Materiales naturales</strong>
              <span>Madera, lino, bambú, cerámica, yute. Sin plástico innecesario.</span>
            </li>
            <li>
              <strong>Accesibilidad</strong>
              <span>Premium no significa inalcanzable. Creemos en el diseño para todos.</span>
            </li>
            <li>
              <strong>Producción local</strong>
              <span>Valoramos el trabajo artesanal argentino y la producción semiartesanal.</span>
            </li>
            <li>
              <strong>Coherencia visual</strong>
              <span>Todo lo que elegimos combina entre sí. Podés comprarlo junto con confianza.</span>
            </li>
          </ul>

          <div className="about-cta">
            <p>¿Querés conocer nuestra colección?</p>
            <Link to="/" className="secondary-button">
              Ver catálogo
            </Link>
            <Link to="/contacto" className="link-button about-contact-link">
              Contactarnos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
