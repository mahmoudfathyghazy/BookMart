import { useLanguage } from "../../hooks/useLanguage";

function ProductActions({ product, onAddToCart, onToggleFavorite, isFavorite }) {
  const { t } = useLanguage();

  return (
    <div className="d-flex gap-2 mt-3">
      <button
        className="btn btn-primary"
        onClick={() => onAddToCart(product)}
        disabled={product.stock === 0}
      >
        {t("addToCart")}
      </button>

      <button
        className={`btn ${isFavorite ? "btn-danger" : "btn-outline-danger"}`}
        onClick={() => onToggleFavorite(product)}
      >
        {isFavorite ? t("removeFavorite") : t("addToFavorite")}
      </button>
    </div>
  );
}

export default ProductActions;
