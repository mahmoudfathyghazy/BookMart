import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../hooks/useLanguage";
import api from "../../services/api";
import LoadingSpinner from "../../components/LoadingSpinner";
import ProductFormModal from "../../components/admin/ProductFormModal";
import { getLocalizedName } from "../../utils/localization";
import { handleImageError } from "../../utils/imageFallback";

/**
 * Admin dashboard with the full CRUD system.
 *
 * - Live store statistics (products / categories / users / orders)
 * - Product Management table: edit (modal) and delete every product,
 *   plus an "Add Product" entry point. All operations go through the
 *   shared data layer (local store in the frontend-only phase).
 */
function AdminDashboard() {
  const { user } = useAuth();
  const { t, lang } = useLanguage();

  const [stats, setStats] = useState({ products: 0, categories: 0, users: 0, orders: 0 });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  const loadAll = () => {
    Promise.all([
      api.getProducts(),
      api.getCategories(),
      api.getUsers(),
      api.getOrders(),
    ])
      .then(([prods, cats, users, orders]) => {
        setProducts(prods);
        setCategories(cats);
        setStats({
          products: prods.length,
          categories: cats.length,
          users: users.length,
          orders: orders.length,
        });
      })
      .finally(() => setLoading(false));
  };

  useEffect(loadAll, []);

  const handleDelete = async (product) => {
    // Simple confirm keeps destructive actions deliberate.
    if (!window.confirm(`${t("deleteLabel")}: ${getLocalizedName(product, lang)}?`)) return;
    await api.deleteProduct(product.id);
    loadAll();
  };

  // NOTE: optional chaining matters here — the React Compiler eagerly
  // evaluates `editingProduct?.id` on every render while building its
  // memo cache, even when the modal is closed (editingProduct is null).
  // A plain `editingProduct.id` crashes the whole admin area.
  const handleSave = async (changes) => {
    const id = editingProduct?.id;
    if (id == null) return;
    await api.updateProduct(id, changes);
    setEditingProduct(null);
    loadAll();
  };

  return (
    <div>
      {/* Welcome header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-4">
        <div>
          <h1 className="h3 mb-1">{t("adminDashboard")}</h1>
          <p className="text-muted mb-0">
            {t("welcomeBack")} <strong>{user?.name}</strong>.
          </p>
        </div>
        <Link to="/admin/products/new" className="btn btn-primary">
          + {t("addProduct")}
        </Link>
      </div>

      {loading ? (
        <LoadingSpinner label={t("loadingDashboard")} />
      ) : (
        <>
          {/* Live stats */}
          <div className="row g-3 g-lg-4 mb-4">
            <div className="col-6 col-lg-3">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <h2 className="h4 text-primary mb-1">{stats.products}</h2>
                  <p className="text-muted mb-0">{t("dashboardProducts")}</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <h2 className="h4 text-primary mb-1">{stats.categories}</h2>
                  <p className="text-muted mb-0">{t("dashboardCategories")}</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <h2 className="h4 text-primary mb-1">{stats.users}</h2>
                  <p className="text-muted mb-0">{t("dashboardUsers")}</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <h2 className="h4 text-primary mb-1">{stats.orders}</h2>
                  <p className="text-muted mb-0">{t("dashboardOrders")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Management (CRUD) */}
          <div className="card shadow-sm">
            <div className="px-3 py-3 border-bottom">
              <h6 className="mb-0 fw-semibold">{t("productManagement")}</h6>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="text-uppercase small fw-semibold text-secondary py-3 px-3">
                      {t("colProduct")}
                    </th>
                    <th scope="col" className="text-uppercase small fw-semibold text-secondary py-3">
                      {t("fCategory")}
                    </th>
                    <th scope="col" className="text-uppercase small fw-semibold text-secondary py-3">
                      {t("colPrice")}
                    </th>
                    <th scope="col" className="text-uppercase small fw-semibold text-secondary py-3">
                      {t("colStock")}
                    </th>
                    <th scope="col" className="text-uppercase small fw-semibold text-secondary py-3">
                      {t("colFeatured")}
                    </th>
                    <th scope="col" className="text-uppercase small fw-semibold text-secondary py-3">
                      {t("colActions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-top">
                      <td className="px-3 py-2">
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={product.image}
                            alt={getLocalizedName(product, lang)}
                            className="rounded-2 bg-light"
                            width="36"
                            height="36"
                            style={{ objectFit: "contain" }}
                            onError={handleImageError}
                          />
                          <span className="fw-semibold">
                            {getLocalizedName(product, lang)}
                          </span>
                        </div>
                      </td>
                      <td className="text-secondary">{t(product.category)}</td>
                      <td>
                        <span className="text-primary fw-semibold">
                          {product.price} {t("egp")}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge rounded-pill px-2 py-1 ${
                            product.stock === 0
                              ? "bg-danger-subtle text-danger"
                              : product.stock <= 10
                                ? "bg-warning-subtle text-warning-emphasis"
                                : "bg-success-subtle text-success"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td>
                        <span className="text-warning fs-5">
                          {product.onSale ? "⭐" : ""}
                        </span>
                      </td>
                      <td>
                        <div className="bm-table-actions">
                          <button
                            type="button"
                            className="btn btn-outline-primary bm-action-btn"
                            onClick={() => setEditingProduct(product)}
                          >
                            {t("editLabel")}
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger bm-action-btn"
                            onClick={() => handleDelete(product)}
                          >
                            {t("deleteLabel")}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Edit modal — keyed per product so it always starts fresh */}
      {editingProduct && (
        <ProductFormModal
          key={editingProduct?.id}
          product={editingProduct}
          categories={categories}
          onSave={handleSave}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
