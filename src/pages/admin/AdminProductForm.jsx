import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage";
import { getLocalizedCategory } from "../../utils/localization";
import api from "../../services/api";

/**
 * "Add Product" page for the admin CRUD system.
 * Creates the product through the shared data layer (local store in
 * the frontend-only phase) and returns to the dashboard.
 */
function AdminProductForm() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    name_ar: "",
    description: "",
    description_ar: "",
    price: "",
    stock: "",
    rating: 4,
    category: "",
    image: "",
    onSale: false,
    discountPrice: "",
  });

  useEffect(() => {
    api.getCategories().then(setCategories);
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    await api.createProduct({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      rating: Number(form.rating),
      discountPrice:
        form.onSale && form.discountPrice ? Number(form.discountPrice) : null,
    });
    setSubmitting(false);
    navigate("/admin");
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <h3 className="fw-semibold mb-4">{t("addProduct")}</h3>

        <form onSubmit={handleSubmit}>
          {/* Names EN / AR */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label htmlFor="np-name" className="form-label fw-semibold">
                {t("fNameEn")} *
              </label>
              <input
                id="np-name"
                name="name"
                type="text"
                className="form-control"
                placeholder="e.g. Blue Ballpoint Pen"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="np-nameAr" className="form-label fw-semibold">
                {t("fNameAr")} *
              </label>
              <input
                id="np-nameAr"
                name="name_ar"
                type="text"
                dir="rtl"
                className="form-control text-end"
                placeholder="مثال: قلم جاف أزرق"
                value={form.name_ar}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Descriptions EN / AR */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label htmlFor="np-desc" className="form-label fw-semibold">
                {t("fDescEn")}
              </label>
              <textarea
                id="np-desc"
                name="description"
                rows="3"
                className="form-control"
                placeholder="Product description..."
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="np-descAr" className="form-label fw-semibold">
                {t("fDescAr")}
              </label>
              <textarea
                id="np-descAr"
                name="description_ar"
                rows="3"
                dir="rtl"
                className="form-control text-end"
                placeholder="وصف المنتج..."
                value={form.description_ar}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Price / Stock / Rating */}
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label htmlFor="np-price" className="form-label fw-semibold">
                {t("fPrice")} *
              </label>
              <input
                id="np-price"
                name="price"
                type="number"
                min="0"
                placeholder="0"
                className="form-control"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="np-stock" className="form-label fw-semibold">
                {t("fStock")} *
              </label>
              <input
                id="np-stock"
                name="stock"
                type="number"
                min="0"
                placeholder="0"
                className="form-control"
                value={form.stock}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="np-rating" className="form-label fw-semibold">
                {t("fRating")}
              </label>
              <input
                id="np-rating"
                name="rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                className="form-control"
                value={form.rating}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Category + Image */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label htmlFor="np-category" className="form-label fw-semibold">
                {t("fCategory")} *
              </label>
              <select
                id="np-category"
                name="category"
                className="form-select"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  ---
                </option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {getLocalizedCategory(cat, lang)}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="np-image" className="form-label fw-semibold">
                {t("fImage")}
              </label>
              <input
                id="np-image"
                name="image"
                type="text"
                className="form-control"
                placeholder="/images/products/calculator/1.jpg"
                value={form.image}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Sale + discount */}
          <div className="row g-3 align-items-center mb-4">
            <div className="col-md-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="np-onSale"
                  name="onSale"
                  checked={form.onSale}
                  onChange={handleChange}
                />
                <label className="form-check-label fw-semibold" htmlFor="np-onSale">
                  ⭐ {t("fOnSale")}
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <label htmlFor="np-discount" className="form-label fw-semibold">
                {t("fDiscount")}
              </label>
              <input
                id="np-discount"
                name="discountPrice"
                type="number"
                min="0"
                className="form-control"
                value={form.discountPrice}
                onChange={handleChange}
                disabled={!form.onSale}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary fw-semibold flex-grow-1 py-2"
            >
              {submitting ? t("loading") : t("addProduct")}
            </button>
            <Link to="/admin" className="btn btn-outline-secondary px-4 py-2">
              {t("cancel")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminProductForm;
