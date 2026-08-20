import { useLanguage } from "../../hooks/useLanguage";

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
        <option value="default">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>
    </div>
  );
}

export default ProductSort;
