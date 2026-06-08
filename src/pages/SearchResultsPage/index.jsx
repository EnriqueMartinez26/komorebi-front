import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { productService } from "../../services/ProductService";
import { useProductsPerPage } from "../../hooks/useProductsPerPage";
import { usePageMeta } from "../../hooks/usePageMeta";
import { DEFAULT_SEARCH_TERM } from "../../utils/constants";
import { Loader } from "../../components/ui/Loader";
import { ProductGrid } from "../../components/products/ProductGrid";
import { Pagination } from "../../components/ui/Pagination";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get("q") || DEFAULT_SEARCH_TERM;
  const currentPage = Number(searchParams.get("page") || 1);
  const limit = useProductsPerPage();
  const { addItem } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  usePageMeta(
    `Resultados para ${term}`,
    `Busqueda de productos para el termino ${term}.`
  );

  const [state, setState] = useState({
    term,
    items: [],
    pagination: { page: currentPage, totalPages: 1, total: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadResults = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await productService.search({
          term,
          page: currentPage,
          limit
        });

        setState(response);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadResults();
  }, [term, currentPage, limit]);

  const handleFavorite = async (productId) => {
    if (isFavorite(productId)) {
      await removeFavorite(productId);
      return;
    }

    await addFavorite(productId);
  };

  const handlePageChange = (page) => {
    setSearchParams({ q: term, page: String(page) });
  };

  if (isLoading) {
    return <Loader label="Buscando productos..." />;
  }

  if (error) {
    return <div className="container page-section form-error">{error}</div>;
  }

  return (
    <section className="container page-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Busqueda</span>
          <h1>Resultados para "{state.term}"</h1>
        </div>
        <strong>{state.pagination.total} coincidencias</strong>
      </div>

      <ProductGrid
        products={state.items}
        isFavorite={isFavorite}
        onToggleFavorite={handleFavorite}
        onAddToCart={addItem}
        emptyTitle="Sin resultados"
        emptyDescription="No encontramos coincidencias para la busqueda actual."
      />

      <Pagination
        page={state.pagination.page}
        totalPages={state.pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

