import { useEffect, useMemo, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import api from "../../services/api";
import { useLanguage } from "../../hooks/useLanguage";
import { getLocalizedName, getLocalizedCategory } from "../../utils/localization";

/**
 * Admin Products / Inventory page.
 *
 * Fetches the full product catalog from json-server via the shared
 * data service (api.getProducts) and renders it as a responsive,
 * category-grouped inventory list. Each row displays key fields
 * (name, SKU, price, stock, status) so admins can quickly scan stock
 * levels.
 */
function AdminProducts() {
  const { lang, t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    Promise.all([api.getProducts(), api.getCategories()])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategories(cats);
      })
      .catch(() => setError("loadFailed"))
      .finally(() => setLoading(false));
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchData();
  };

  useEffect(fetchData, []);

  /**
   * Derive a readable, deterministic SKU for each product.
   * The data model does not store SKUs, so we build one from the
   * category slug and the zero-padded product id.
   */
  const getSku = (product) => {
    const prefix = product.category
      .split("-")
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
    return `${prefix}-${String(product.id).padStart(3, "0")}`;
  };

  /**
   * Simple status derived from stock level.
   */
  const getStockStatus = (stock) => {
    if (stock === 0) return { label: t("outOfStock"), className: "text-danger" };
    if (stock <= 10) return { label: t("lowStock"), className: "text-warning" };
    return { label: t("inStock"), className: "text-success" };
  };

  /**
   * Group products by category slug, preserving the category order
   * returned from the API.
   */
  const productsByCategory = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      map[cat.slug] = products.filter((p) => p.category === cat.slug);
    });
    return map;
  }, [products, categories]);

  return (
    <div>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-2">
        <h1 className="h3 mb-0">{t("inventory")}</h1>
        <span className="text-muted">
          {products.length} {t("dashboardProducts")}
        </span>
      </div>

      {loading && <LoadingSpinner label={t("loadingInventory")} />}
      {error && <ErrorMessage message={t(error)} onRetry={handleRetry} />}

      {!loading &&
        !error &&
        categories.map((cat) => {
          const catProducts = productsByCategory[cat.slug] || [];
          if (catProducts.length === 0) return null;

          return (
            <section key={cat.slug} className="mb-5">
              {/* Category header */}
              <div className="d-flex align-items-center gap-3 mb-3 pb-2 border-bottom">
                <h2 className="h5 mb-0">{getLocalizedCategory(cat, lang)}</h2>
                <span className="badge bg-secondary rounded-pill">
                  {catProducts.length}
                </span>
              </div>

              {/* Desktop: grouped table */}
              <div className="d-none d-md-block table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">{t("colProductName")}</th>
                      <th scope="col">{t("colSku")}</th>
                      <th scope="col" className="text-end">{t("colPrice")}</th>
                      <th scope="col" className="text-center">{t("colStock")}</th>
                      <th scope="col">{t("colStatus")}</th>
                      <th scope="col" className="text-center">{t("colSale")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catProducts.map((product) => {
                      const status = getStockStatus(product.stock);
                      return (
                        <tr key={product.id}>
                          <td className="fw-medium">{getLocalizedName(product, lang)}</td>
                          <td>
                            <code>{getSku(product)}</code>
                          </td>
                          <td className="text-end">
                            {product.onSale && product.discountPrice ? (
                              <>
                                <span className="bm-price-old">
                                  {product.price}
                                </span>
                                <strong>{product.discountPrice} {t("egp")}</strong>
                              </>
                            ) : (
                              <strong>{product.price} {t("egp")}</strong>
                            )}
                          </td>
                          <td className="text-center">{product.stock}</td>
                          <td className={status.className}>{status.label}</td>
                          <td className="text-center">
                            {product.onSale ? (
                              <span className="badge bg-warning text-dark">
                                {t("onSaleBadge")}
                              </span>
                            ) : (
                              <span className="text-muted">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile: stacked list cards */}
              <div className="d-md-none">
                {catProducts.map((product) => {
                  const status = getStockStatus(product.stock);
                  return (
                    <div key={product.id} className="card mb-3 shadow-sm">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="card-title mb-0">{getLocalizedName(product, lang)}</h6>
                          {product.onSale && (
                            <span className="badge bg-warning text-dark">
                              {t("onSaleBadge")}
                            </span>
                          )}
                        </div>
                        <p className="card-text mb-1">
                          <small className="text-muted">{t("colSku")}:</small>{" "}
                          <code>{getSku(product)}</code>
                        </p>
                        <p className="card-text mb-1">
                          <small className="text-muted">{t("colPrice")}:</small>{" "}
                          <strong>
                            {product.onSale && product.discountPrice
                              ? product.discountPrice
                              : product.price}{" "}
                            {t("egp")}
                          </strong>
                        </p>
                        <p className="card-text mb-1">
                          <small className="text-muted">{t("colStock")}:</small>{" "}
                          {product.stock}
                        </p>
                        <p className={`card-text mb-0 ${status.className}`}>
                          <small className="text-muted">{t("colStatus")}:</small>{" "}
                          {status.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
    </div>
  );
}

export default AdminProducts;
