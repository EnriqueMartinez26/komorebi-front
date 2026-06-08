import { usePageMeta } from "../../hooks/usePageMeta";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { ProductGrid } from "../../components/products/ProductGrid";
import { EmptyState } from "../../components/ui/EmptyState";

export function FavoritesPage() {
  usePageMeta("Favoritos", "Listado de productos favoritos.");

  const { items, isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { addItem } = useCart();

  const handleFavorite = async (productId) => {
    if (isFavorite(productId)) {
      await removeFavorite(productId);
      return;
    }

    await addFavorite(productId);
  };

  return (
    <section className="container page-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Favoritos</span>
          <h1>Tus productos guardados</h1>
        </div>
      </div>

      {items.length ? (
        <ProductGrid
          products={items}
          isFavorite={isFavorite}
          onToggleFavorite={handleFavorite}
          onAddToCart={addItem}
        />
      ) : (
        <EmptyState
          title="Sin favoritos"
          description="Todavía no agregaste productos a favoritos."
        />
      )}
    </section>
  );
}

