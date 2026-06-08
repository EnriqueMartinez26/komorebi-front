import { NavLink } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { CartBadge } from "../cart/CartBadge";
import { FavoritesBadge } from "../favorites/FavoritesBadge";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useUI } from "../../context/UIContext";
import { useAuth } from "../../context/AuthContext";
import { SearchBar } from "../search/SearchBar";

// cada link del navbar
class NavItem {
  constructor(label, path, icon = null, requiresAuth = false) {
    this.label = label;
    this.path = path;
    this.icon = icon;
    this.requiresAuth = requiresAuth;
  }

  // si se muestra o no
  canRender(isAuthenticated) {
    // si necesita login y no hay sesión, ocultar
    if (this.requiresAuth && !isAuthenticated) {
      return false;
    }
    return true;
  }
}

// maneja los items del menú
class NavMenuManager {
  constructor() {
    this.leftItems = [
      new NavItem("Home", "/"),
      new NavItem("Destacado", "/buscar?q=destacados"),
      new NavItem("Contacto", "/contacto"),
      new NavItem("Quiénes Somos", "/quienes-somos")
    ];

    this.rightItems = [
      new NavItem("Favoritos", "/favoritos", "heart", false), // Visible para invitados
      new NavItem("Carrito", "/carrito", "cart", false),      // Visible para invitados
      new NavItem("Ayuda", "/ayuda", "help")
    ];
  }

  getLeftMenu(isAuthenticated) {
    return this.leftItems.filter((item) => item.canRender(isAuthenticated));
  }

  getRightMenu(isAuthenticated) {
    return this.rightItems.filter((item) => item.canRender(isAuthenticated));
  }

  getMobileMenu(isAuthenticated) {
    return [...this.leftItems, ...this.rightItems].filter((item) =>
      item.canRender(isAuthenticated)
    );
  }
}

// creo el menu
const menuManager = new NavMenuManager();

export function StickyNavbar() {
  const { cartCount } = useCart();
  const { favoritesCount } = useFavorites();
  const { isMobileMenuOpen, closeMobileMenu } = useUI();
  const { isAuthenticated } = useAuth();

  const renderBadge = (label) => {
    if (label === "Favoritos") return <FavoritesBadge count={favoritesCount} />;
    if (label === "Carrito") return <CartBadge count={cartCount} />;
    return null;
  };

  return (
    <nav className="sticky-nav" aria-label="Navegación principal">
      <div className="container nav-desktop">
        <div className="nav-left">
          {menuManager.getLeftMenu(isAuthenticated).map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-right">
          {menuManager.getRightMenu(isAuthenticated).map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${item.icon === "help" ? "nav-link--icon-right" : ""} ${
                  isActive ? "is-active" : ""
                }`
              }
              aria-label={item.label}
            >
              {item.icon && item.icon !== "help" && <Icon name={item.icon} />}
              <span className="nav-label">{item.label}</span>
              {item.icon === "help" && <Icon name={item.icon} />}
              {renderBadge(item.label)}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? "is-open" : ""}`}>
        <div className="mobile-drawer-panel">
          <div className="mobile-search-wrapper" style={{ padding: "0.5rem" }}>
            <SearchBar expanded={true} className="mobile-search-bar" onToggle={() => {}} />
          </div>
          {menuManager.getMobileMenu(isAuthenticated).map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}
              onClick={closeMobileMenu}
            >
              {item.icon && item.icon !== "help" && <Icon name={item.icon} />}
              <span>{item.label}</span>
              {item.icon === "help" && <Icon name={item.icon} />}
              {renderBadge(item.label)}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
