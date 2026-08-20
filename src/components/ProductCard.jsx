import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

/**
 * Shared product card used across Home, Market, Favorites, etc.
 * Shape of `product`:
 * { id, name, category, price, image, rating?, onSale?, discountPrice? }
 */
function ProductCard({ product, onAddToCart, onToggleFavorite, isFavorite }) {
  const { t } = useLanguage();
  const hasDiscount = product.onSale && product.discountPrice;

  return (
    <div className="card h-100 product-card position-relative">
      {product.onSale && <span className="bm-sale-badge">SALE</span>}

      <Link to={`/product/${product.id}`} className="bm-product-img-wrap d-block" style={{ height: "180px" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-100 h-100"
          style={{ objectFit: "contain" }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <span className="text-muted small text-uppercase">{product.category}</span>
        <h6 className="card-title mt-1">
          <Link to={`/product/${product.id}`} className="text-decoration-none">
            {product.name}
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
