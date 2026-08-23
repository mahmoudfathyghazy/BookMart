import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ProductSort from "../components/market/ProductSort";
import CategoryRail from "../components/market/CategoryRail";
import ProductGrid from "../components/market/ProductGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import api from "../services/api";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { useLanguage } from "../hooks/useLanguage";
import { getLocalizedCategory } from "../utils/localization";

function Market() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || ""
  );
  const [sort, setSort] = useState("default");

  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t, lang } = useLanguage();

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

  useEffect(() => {
    if (activeCategory) {
      const el = document.getElementById(`category-${activeCategory}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length]);

  const applySort = (list) => {
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...list].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return list;
    }
  };

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      ),
    [products, search]
  );

  const productsByCategory = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      map[cat.slug] = applySort(
        filteredProducts.filter((p) => p.category === cat.slug)
      );
    });
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, filteredProducts, sort]);

  return (
    <div className="container py-5">
      <h1 className="h3 mb-4">{t("market")}</h1>

      {/* Search + sort share one row; bottom-aligned so both controls
          sit on the same level despite the sort label above it. */}
      <div className="row g-3 mb-2 align-items-lg-end">
        <div className="col-12 col-lg-8">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder={t("searchPlaceholder")}
          />
        </div>
        <div className="col-12 col-lg-4">
          <ProductSort sort={sort} onSortChange={setSort} />
        </div>
      </div>

      {!loading && !error && (
        <CategoryRail
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      )}

      {loading && <LoadingSpinner label={t("loadingProducts")} />}
      {error && <ErrorMessage message={t(error)} onRetry={handleRetry} />}

      {!loading &&
        !error &&
        categories.map((cat) => {
          const catProducts = productsByCategory[cat.slug] || [];
          if (catProducts.length === 0) return null;

          return (
            <section
              key={cat.slug}
              id={`category-${cat.slug}`}
              className="bm-category-row mb-5"
            >
              <h2 className="bm-section-title h5">{getLocalizedCategory(cat, lang)}</h2>
              <ProductGrid
                products={catProducts}
                onAddToCart={addToCart}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            </section>
          );
        })}
    </div>
  );
}

export default Market;
