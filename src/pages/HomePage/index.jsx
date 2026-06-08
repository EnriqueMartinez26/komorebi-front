import { useEffect, useState } from "react";
import { bannerService } from "../../services/BannerService";
import { categoryService } from "../../services/CategoryService";
import { productService } from "../../services/ProductService";
import { usePageMeta } from "../../hooks/usePageMeta";
import { useProductsPerPage } from "../../hooks/useProductsPerPage";
import { FeaturedSlider } from "../../components/products/FeaturedSlider";
import { AdBanner } from "../../components/ui/AdBanner";
import { ProductGrid } from "../../components/products/ProductGrid";
import { Pagination } from "../../components/ui/Pagination";
import { CategoryCollapse } from "../../components/categories/CategoryCollapse";
import { Loader } from "../../components/ui/Loader";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

export function HomePage() {
  usePageMeta("Komorebi Home | Objetos de Calma", "Objetos simples para rituales cotidianos.");

  const limit = useProductsPerPage();
  const { addItem } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [state, setState] = useState({
    featured: [],
    products: [],
    categories: [],
    mainBanner: null,
    sideBanner: null,
    pagination: { page: 1, totalPages: 1 }
  });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const [featuredResponse, productResponse, categoryResponse, bannerResponse] =
          await Promise.all([
            productService.featured(),
            productService.list({ page, limit }),
            categoryService.list(),
            bannerService.list()
          ]);

        setState({
          featured: featuredResponse.items,
          products: productResponse.items,
          categories: categoryResponse.items,
          mainBanner:
            bannerResponse.items.find((item) => item.position === "home-main") || null,
          sideBanner:
            bannerResponse.items.find((item) => item.position === "categories-side") ||
            null,
          pagination: productResponse.pagination
        });
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [page, limit]);

  const handleFavorite = async (productId) => {
    if (isFavorite(productId)) {
      await removeFavorite(productId);
      return;
    }

    await addFavorite(productId);
  };

  if (isLoading) {
    return <Loader label="Cargando home..." />;
  }

  if (error) {
    return <div className="container page-section form-error">{error}</div>;
  }

  return (
    <div className="container page-section">
      <FeaturedSlider items={state.featured} />
      <AdBanner banner={state.mainBanner} />

      <section className="catalog-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">Curaduría</span>
            <h2>Colección de Bienestar y Calma</h2>
          </div>
        </div>

        <ProductGrid
          products={state.products}
          isFavorite={isFavorite}
          onToggleFavorite={handleFavorite}
          onAddToCart={addItem}
        />

        <Pagination
          page={state.pagination.page}
          totalPages={state.pagination.totalPages}
          onPageChange={setPage}
        />
      </section>

      <CategoryCollapse
        categories={state.categories}
        sideBanner={state.sideBanner}
      />
    </div>
  );
}

