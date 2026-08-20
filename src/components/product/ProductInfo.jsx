import { useLanguage } from "../../hooks/useLanguage";

function ProductInfo({ product }) {
  const { t } = useLanguage();
  const hasDiscount = product.onSale && product.discountPrice;

  return (
    <div>
      <span className="text-muted text-uppercase small">{product.category}</span>
      <h1 className="h3 mt-1">{product.name}</h1>
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
