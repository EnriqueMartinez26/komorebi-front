import { NavLink } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { CartBadge } from "../cart/CartBadge";
import { FavoritesBadge } from "../favorites/FavoritesBadge";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useUI } from "../../context/UIContext";
import { SearchBar } from "../search/SearchBar";

class NavItem {
  constructor(label, path, icon = null) {
    this.label = label;
    this.path = path;
    this.icon = icon;
  }
}

class NavMenuManager {
  constructor() {
    this.leftItems = [
      new NavItem("Home", "/"),
      new NavItem("Destacado", "/buscar?q=destacados"),
      new NavItem("Contacto", "/contacto"),
      new NavItem("Quiénes Somos", "/quienes-somos")
    ];

    this.rightItems = [
      new NavItem("Favoritos", "/favoritos", "heart"),
      new NavItem("Carrito", "/carrito", "cart"),
      new NavItem("Ayuda", "/ayuda", "help")
    ];
  }

  getLeftMenu() {
    return this.leftItems;
  }

  getRightMenu() {
    return this.rightItems;
  }

  getMobileMenu() {
    return [...this.leftItems, ...this.rightItems];
  }
}

const menuManager = new NavMenuManager();

export function StickyNavbar() {
  const { cartCount } = useCart();
  const { favoritesCount } = useFavorites();
  const { isMobileMenuOpen, closeMobileMenu } = useUI();

  const renderBadge = (label) => {
    if (label === "Favoritos") return <FavoritesBadge count={favoritesCount} />;
    if (label === "Carrito") return <CartBadge count={cartCount} />;
    return null;
  };

  return (
    <nav className="sticky-nav" aria-label="Navegación principal">
      <div className="container nav-desktop">
        <div className="nav-left">
          {menuManager.getLeftMenu().map((item) => (
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
          {menuManager.getRightMenu().map((item) => (
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

      <div className={`mobile-drawer ${isMobileMenuOpen ? "is-open" : ""}`}>
        <div className="mobile-drawer-panel">
          <div className="mobile-search-wrapper" style={{ padding: "0.5rem" }}>
            <SearchBar expanded={true} className="mobile-search-bar" onToggle={() => {}} />
          </div>
          {menuManager.getMobileMenu().map((item) => (
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
