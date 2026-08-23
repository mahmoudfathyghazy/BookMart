import { useLanguage } from "../../hooks/useLanguage";
import { getLocalizedName } from "../../utils/localization";

function ProductInfo({ product }) {
  const { t, lang } = useLanguage();
  const hasDiscount = product.onSale && product.discountPrice;
  const displayName = getLocalizedName(product, lang);

  return (
    <div>
      <span className="text-muted text-uppercase small">{t(product.category)}</span>
      <h1 className="h3 mt-1">{displayName}</h1>
      <p className="text-muted">{product.description}</p>
      <h3 className="text-primary fw-bold">
        {hasDiscount && (
          <span className="bm-price-old">{product.price} {t("egp")}</span>
        )}
        {hasDiscount ? product.discountPrice : product.price} {t("egp")}
      </h3>
      <p className="mb-1">Rating: {product.rating ?? "N/A"} / 5</p>
      <p className={product.stock > 0 ? "text-success" : "text-danger"}>
        {product.stock > 0
          ? `${product.stock} items available`
          : "Out of stock"}
      </p>
    </div>
  );
}

export default ProductInfo;
