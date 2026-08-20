import ProductGrid from "../components/market/ProductGrid";
import EmptyState from "../components/EmptyState";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";

function Favorites() {
  const { favoriteProducts, toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h1 className="h3 mb-4">Favorites</h1>

      {favoriteProducts.length === 0 ? (
        <EmptyState
          message="You have no favorite products yet."
          actionLabel="Browse the Market"
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
