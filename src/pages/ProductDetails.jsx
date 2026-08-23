import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductInfo from "../components/product/ProductInfo";
import ProductActions from "../components/product/ProductActions";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import api from "../services/api";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { useLanguage } from "../hooks/useLanguage";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t } = useLanguage();

  const fetchProduct = () => {
    Promise.all([api.getProduct(id), api.getProducts()])
      .then(([prod, allProducts]) => {
        setProduct(prod);
        setRelated(
          allProducts.filter(
            (p) => p.category === prod.category && String(p.id) !== String(prod.id)
          )
        );
      })
      .catch(() => setError("loadFailed"))
      .finally(() => setLoading(false));
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchProduct();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting state on id change is intentional
    setLoading(true);
    setError(null);
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <LoadingSpinner label={t("loadingProduct")} />;
  if (error) return <div className="container py-5"><ErrorMessage message={t(error)} onRetry={handleRetry} /></div>;
  if (!product) return null;

  return (
    <div className="container py-5">
      <Link to="/market" className="text-decoration-none">&larr; {t("market")}</Link>

      <div className="row mt-4 g-4">
        <div className="col-12 col-md-6">
          <div className="bm-product-img-wrap rounded" style={{ height: "420px" }}>
            <img
              src={product.image}
              alt={product.name}
              className="w-100 h-100"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <ProductInfo product={product} />
          <ProductActions
            product={product}
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite(product.id)}
          />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-5">
          <h2 className="bm-section-title h5">{t("relatedProducts")}</h2>
          <div className="row g-4">
            {related.map((item) => (
              <div className="col-12 col-sm-6 col-lg-3" key={item.id}>
                <ProductCard
                  product={item}
                  onAddToCart={addToCart}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={isFavorite(item.id)}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetails;
