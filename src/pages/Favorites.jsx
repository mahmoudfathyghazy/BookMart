import ProductGrid from "../components/market/ProductGrid";
import EmptyState from "../components/EmptyState";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { useLanguage } from "../hooks/useLanguage";

function Favorites() {
  const { favoriteProducts, toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h1 className="h3 mb-4">{t("favorites")}</h1>

      {favoriteProducts.length === 0 ? (
        <EmptyState
          message={t("favoritesEmpty")}
          actionLabel={t("browseMarket")}
          onAction={() => navigate("/market")}
        />
      ) : (
        <ProductGrid
          products={favoriteProducts}
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      )}
    </div>
  );
}

export default Favorites;
