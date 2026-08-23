import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { getLocalizedName } from "../utils/localization";
import { handleImageError } from "../utils/imageFallback";

/**
 * Shared product card used across Home, Market, Favorites, etc.
 * Shape of `product`:
 * { id, name, name_ar, category, price, image, rating?, onSale?, discountPrice? }
 */
function ProductCard({ product, onAddToCart, onToggleFavorite, isFavorite }) {
  const { t, lang } = useLanguage();
  const hasDiscount = product.onSale && product.discountPrice;
  const displayName = getLocalizedName(product, lang);

  return (
    <div className="card h-100 product-card position-relative">
      {product.onSale && <span className="bm-sale-badge">SALE</span>}

      <Link to={`/product/${product.id}`} className="bm-product-img-wrap d-block" style={{ height: "180px" }}>
        <img
          src={product.image}
          alt={displayName}
          className="w-100 h-100"
          style={{ objectFit: "contain" }}
          onError={handleImageError}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <span className="text-muted small text-uppercase">{t(product.category)}</span>
        <h6 className="card-title mt-1">
          <Link to={`/product/${product.id}`} className="text-decoration-none">
            {displayName}
          </Link>
        </h6>

        <p className="fw-bold mb-2">
          {hasDiscount && (
            <span className="bm-price-old">{product.price} {t("egp")}</span>
          )}
          {hasDiscount ? product.discountPrice : product.price} {t("egp")}
        </p>

        <div className="mt-auto d-flex gap-2">
          {onAddToCart && (
            <button
              className="btn btn-primary btn-sm flex-grow-1"
              onClick={() => onAddToCart(product)}
            >
              {t("addToCart")}
            </button>
          )}
          {onToggleFavorite && (
            <button
              className={`btn btn-sm ${isFavorite ? "btn-danger" : "btn-outline-danger"}`}
              onClick={() => onToggleFavorite(product)}
              aria-label="Toggle favorite"
            >
              ♥
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
