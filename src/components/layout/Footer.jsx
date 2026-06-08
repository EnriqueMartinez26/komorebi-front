import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Icon } from "../ui/Icon";
import { socialMediaManager } from "../../utils/social";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-column-brand">
          <Logo variant="horizontal" className="desktop-only footer-brand" />
          <Logo variant="mark" className="mobile-only footer-brand footer-brand--mobile" />
          <p>Curaduría de objetos y rituales cotidianos para el bienestar en tu hogar.</p>
        </div>
        <div>
          <h4>Navegación</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/buscar?q=destacados">Destacado</Link></li>
            <li><Link to="/quienes-somos">Quiénes Somos</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <h4>Cuenta</h4>
          <ul>
            <li><Link to="/favoritos">Favoritos</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
            <li><Link to="/ayuda">Ayuda</Link></li>
            <li><Link to="/forgot-password">Recuperar contraseña</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contacto y Redes</h4>
          <ul className="footer-contact-list">
            <li>hola@komorebihome.dev</li>
            <li>+54 11 5555 5555</li>
            <li className="footer-social-row">
              {socialMediaManager.getChannels().map((channel) => (
                <a
                  key={channel.name}
                  href={channel.url}
                  target="_blank"
                  rel="noreferrer"
                  title={channel.name}
                  className="social-icon-link"
                >
                  <Icon name={channel.iconName} />
                </a>
              ))}
            </li>
            <li className="footer-qr" style={{ marginTop: "1.5rem" }}>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "inherit" }}>
                <div>
                  <span style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>Ver Sitio:</span>
                  <img
                    src="/images/qr_deploy.png"
                    alt="QR del Deploy"
                    style={{ width: "105px", height: "105px", borderRadius: "8px", border: "1px solid var(--border)", background: "white", padding: "4px", transition: "transform 0.2s ease" }}
                  />
                </div>
                <div>
                  <span style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>Data Fiscal:</span>
                  <img
                    src="/images/data_fiscal.png"
                    alt="Data Fiscal AFIP"
                    style={{ width: "105px", height: "105px", borderRadius: "8px", border: "1px solid var(--border)", background: "white", padding: "4px", transition: "transform 0.2s ease" }}
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© 2026 Komorebi Home. Todos los derechos reservados.</span>
          <span className="footer-bottom-links">
            <Link to="/ayuda">Ayuda</Link>
            <Link to="/contacto">Contacto</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
