import { useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { getLocalizedCategory } from "../../utils/localization";
import { handleImageError } from "../../utils/imageFallback";

/**
 * Edit-product modal for the admin dashboard CRUD system.
 *
 * A controlled Bootstrap-styled modal driven purely by React state
 * (no bootstrap.js dependency). Receives the product to edit plus
 * onSave/onClose callbacks from the dashboard.
 */
function ProductFormModal({ product, categories, onSave, onClose }) {
  const { t, lang } = useLanguage();
  // Initialized from props; the dashboard remounts the modal with a
  // `key` per product so no sync effect is needed.
  const [form, setForm] = useState(product);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      rating: Number(form.rating),
      discountPrice: form.onSale && form.discountPrice ? Number(form.discountPrice) : null,
    });
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content bm-edit-modal">
            <div className="modal-header">
              <h5 className="modal-title">{t("editProduct")}</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label={t("closeLabel")} />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {/* Names EN / AR */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label htmlFor="pf-name" className="form-label fw-semibold">
                      {t("fNameEn")} *
                    </label>
                    <input
                      id="pf-name"
                      name="name"
                      type="text"
                      className="form-control"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="pf-nameAr" className="form-label fw-semibold">
                      {t("fNameAr")} *
                    </label>
                    <input
                      id="pf-nameAr"
                      name="name_ar"
                      type="text"
                      dir="rtl"
                      className="form-control text-end"
                      value={form.name_ar ?? ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Descriptions EN / AR */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label htmlFor="pf-desc" className="form-label fw-semibold">
                      {t("fDescEn")}
                    </label>
                    <textarea
                      id="pf-desc"
                      name="description"
                      rows="3"
                      className="form-control"
                      value={form.description ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="pf-descAr" className="form-label fw-semibold">
                      {t("fDescAr")}
                    </label>
                    <textarea
                      id="pf-descAr"
                      name="description_ar"
                      rows="3"
                      dir="rtl"
                      className="form-control text-end"
                      value={form.description_ar ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Price / Stock / Rating */}
                <div className="row g-3 mb-3">
                  <div className="col-md-4">
                    <label htmlFor="pf-price" className="form-label fw-semibold">
                      {t("fPrice")} *
                    </label>
                    <input
                      id="pf-price"
                      name="price"
                      type="number"
                      min="0"
                      className="form-control"
                      value={form.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="pf-stock" className="form-label fw-semibold">
                      {t("fStock")} *
                    </label>
                    <input
                      id="pf-stock"
                      name="stock"
                      type="number"
                      min="0"
                      className="form-control"
                      value={form.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="pf-rating" className="form-label fw-semibold">
                      {t("fRating")}
                    </label>
                    <input
                      id="pf-rating"
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
                    <label htmlFor="pf-category" className="form-label fw-semibold">
                      {t("fCategory")} *
                    </label>
                    <select
                      id="pf-category"
                      name="category"
                      className="form-select"
                      value={form.category}
                      onChange={handleChange}
                      required
                    >
                      {categories.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>
                          {getLocalizedCategory(cat, lang)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="pf-image" className="form-label fw-semibold">
                      {t("fImage")}
                    </label>
                    <input
                      id="pf-image"
                      name="image"
                      type="text"
                      className="form-control"
                      placeholder="/images/products/... or https://..."
                      value={form.image ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Sale + discount */}
                <div className="row g-3 align-items-center">
                  <div className="col-md-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="pf-onSale"
                        name="onSale"
                        checked={!!form.onSale}
                        onChange={handleChange}
                      />
                      <label className="form-check-label fw-semibold" htmlFor="pf-onSale">
                        ⭐ {t("fOnSale")}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="pf-discount" className="form-label fw-semibold">
                      {t("fDiscount")}
                    </label>
                    <input
                      id="pf-discount"
                      name="discountPrice"
                      type="number"
                      min="0"
                      className="form-control"
                      value={form.discountPrice ?? ""}
                      onChange={handleChange}
                      disabled={!form.onSale}
                    />
                  </div>
                  <div className="col-md-4 text-center">
                    <img
                      src={form.image}
                      alt=""
                      width="64"
                      height="64"
                      className="rounded border bg-light"
                      style={{ objectFit: "contain" }}
                      onError={handleImageError}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary fw-semibold flex-grow-1">
                  {t("saveChanges")}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  {t("closeLabel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" onClick={onClose} />
    </>
  );
}

export default ProductFormModal;
