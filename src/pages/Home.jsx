import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import api from "../services/api";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { useLanguage } from "../hooks/useLanguage";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t } = useLanguage();

  const fetchData = () => {
    api
      .getProducts()
      .then(setProducts)
      .catch(() => setError("loadFailed"))
      .finally(() => setLoading(false));
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchData();
  };

  useEffect(fetchData, []);

  // Row 1: one product from each of 5 different categories (a mixed showcase)
  const pickOnePerCategory = (list, count) => {
    const seen = new Set();
    const picks = [];
    for (const p of list) {
      if (!seen.has(p.category)) {
        seen.add(p.category);
        picks.push(p);
      }
      if (picks.length === count) break;
    }
    return picks;
  };

  const mixedShowcase = pickOnePerCategory(products, 5);

  // Row 2: discounted products, one per category, up to 5 categories
  const dealsByCategory = pickOnePerCategory(
    products.filter((p) => p.onSale),
    5
  );

  return (
    <main>
      {/*
        Header background image goes here:
        public/images/header/hero.jpg
        Edit the title/subtitle text in src/i18n/translations.js (heroTitle / heroSubtitle).
      */}
      <section
        className="bm-hero"
        style={{ backgroundImage: "url(/images/header/hero.jpg)" }}
      >
        <div className="container">
          <div className="bm-hero__content">
            <h3 className="bm-hero__title">{t("heroTitle")}</h3>
            <p className="bm-hero__subtitle">{t("heroSubtitle")}</p>
            <Link to="/market" className="bm-hero__cta">
              {t("shopNow")} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {loading && <LoadingSpinner label={t("loading")} />}
      {error && (
        <div className="container py-5">
          <ErrorMessage message={t(error)} onRetry={handleRetry} />
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Row 1: mixed products across categories */}
          <section className="container py-5">
            <h2 className="bm-section-title">{t("ourProducts")}</h2>
            <div className="row g-4">
              {mixedShowcase.map((product, i) => (
                <div
                  className="col-12 col-sm-6 col-lg-4 col-xl fade-in-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                  key={product.id}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={addToCart}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={isFavorite(product.id)}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Row 2: deals across categories */}
          {dealsByCategory.length > 0 && (
            <section className="container py-5">
              <h2 className="bm-section-title">{t("dealsTitle")}</h2>
              <div className="row g-4">
                {dealsByCategory.map((product, i) => (
                  <div
                    className="col-12 col-sm-6 col-lg-4 col-xl fade-in-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                    key={product.id}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={addToCart}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={isFavorite(product.id)}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default Home;
