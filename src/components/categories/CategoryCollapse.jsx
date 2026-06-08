import { useState } from "react";
import { Link } from "react-router-dom";
import { AdBanner } from "../ui/AdBanner";
import { Icon } from "../ui/Icon";

// acciones de cada categoría
class CategoryAction {
  constructor(label, pathGenerator, iconName = null) {
    this.label = label;
    this.pathGenerator = pathGenerator;
    this.iconName = iconName;
  }
}

// arma los botones según la categoría
class CategoryActionManager {
  constructor() {
    this.actions = [
      new CategoryAction(
        "Ver colección completa",
        (category) => `/buscar?q=${encodeURIComponent(category.name)}`,
        "arrowRight"
      )
    ];
  }

  getActionsForCategory(category) {
    if (!category) return [];
    return this.actions;
  }
}

// creo el manager
const actionManager = new CategoryActionManager();

export function CategoryCollapse({ categories, sideBanner }) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.slug || "");

  if (!categories.length) {
    return null;
  }

  const selectedCategory = categories.find(
    (category) => category.slug === activeCategory
  );

  return (
    <section className="category-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Categorías</span>
          <h2>Explorá por categoría</h2>
        </div>
      </div>
      <div className="category-layout">
        <div>
          <div className="category-button-group" role="tablist" aria-label="Categorías">
            {categories.map((category) => (
              <button
                type="button"
                key={category._id}
                className={category.slug === activeCategory ? "is-active" : ""}
                onClick={() => setActiveCategory(category.slug)}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="category-panel" role="tabpanel">
            <h3>{selectedCategory?.name}</h3>
            <p>{selectedCategory?.description}</p>
            
            <div className="category-chip-row">
              {actionManager.getActionsForCategory(selectedCategory).map((action, index) => (
                <Link
                  key={index}
                  to={action.pathGenerator(selectedCategory)}
                  className="link-button"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}
                >
                  {action.label}
                  {action.iconName && <Icon name={action.iconName} />}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <aside className="category-side-ad desktop-tablet-only">
          <AdBanner banner={sideBanner} />
        </aside>
      </div>
    </section>
  );
}
