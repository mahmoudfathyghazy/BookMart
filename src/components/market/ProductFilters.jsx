const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "school-supplies", label: "School Supplies" },
  { value: "stationery", label: "Writing & Stationery" },
  { value: "bags", label: "Bags" },
  { value: "calculators", label: "Calculators" },
  { value: "electronics", label: "Electronics" },
  { value: "accessories", label: "Accessories" },
];

function ProductFilters({ category, onCategoryChange }) {
  return (
    <div className="mb-3 mb-lg-0">
      <label className="form-label small text-muted">Category</label>
      <select
        className="form-select"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {CATEGORIES.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProductFilters;
