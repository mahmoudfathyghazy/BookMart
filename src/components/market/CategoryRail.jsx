function CategoryRail({ categories, activeCategory, onSelect }) {
  const handleClick = (slug) => {
    onSelect(slug);
    const el = document.getElementById(`category-${slug}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bm-category-rail mb-4">
      {categories.map((cat) => (
        <button
          key={cat.slug}
          type="button"
          className={`bm-category-pill${activeCategory === cat.slug ? " active" : ""}`}
          onClick={() => handleClick(cat.slug)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryRail;
