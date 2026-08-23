import { useLanguage } from "../../hooks/useLanguage";

/**
 * Sort dropdown for the Market page.
 * Option labels come from the i18n translations so the filter
 * switches between English and Arabic with the rest of the app.
 */
function ProductSort({ sort, onSortChange }) {
  const { t } = useLanguage();

  return (
    <div>
      <label className="form-label small text-muted">{t("sortBy")}</label>
      <select
        className="form-select"
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="default">{t("sortDefault")}</option>
        <option value="price-asc">{t("sortPriceAsc")}</option>
        <option value="price-desc">{t("sortPriceDesc")}</option>
        <option value="name-asc">{t("sortNameAsc")}</option>
        <option value="name-desc">{t("sortNameDesc")}</option>
      </select>
    </div>
  );
}

export default ProductSort;
