import { useState } from "react";
import { SearchBar } from "../search/SearchBar";
import { Icon } from "../ui/Icon";
import { useUI } from "../../context/UIContext";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { socialMediaManager } from "../../utils/social";

export function Header() {
  const { toggleMobileMenu, openLogin, openRegister } = useUI();
  const { isAuthenticated, user, logout } = useAuth();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="header-brand-row">
          <button
            type="button"
            className="icon-button mobile-only"
            onClick={toggleMobileMenu}
            aria-label="Abrir navegacion"
          >
            <Icon name="menu" />
          </button>
          <Link className="brand-mark" to="/">
            Komorebi
          </Link>
        </div>

        <div className="header-social desktop-only" aria-label="Redes sociales">
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
        </div>

        <SearchBar
          expanded={isSearchExpanded}
          onToggle={() => setIsSearchExpanded((current) => !current)}
        />

        <div className="header-account">
          {isAuthenticated ? (
            <>
              <span className="user-pill">
                <Icon name="user" />
                {user.firstName}
              </span>
              <button type="button" className="link-button" onClick={logout}>
                Salir
              </button>
            </>
          ) : (
            <>
              <button type="button" className="link-button" onClick={openLogin}>
                Ingresar
              </button>
              <button type="button" className="secondary-button" onClick={openRegister}>
                Registro
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
