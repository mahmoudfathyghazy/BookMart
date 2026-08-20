import ProductCard from "../ProductCard";
import EmptyState from "../EmptyState";

function ProductGrid({ products, onAddToCart, onToggleFavorite, isFavorite }) {
  if (!products || products.length === 0) {
    return <EmptyState message="No products match your search." />;
  }

  return (
    <div className="row g-4">
      {products.map((product, i) => (
        <div
          className="col-12 col-sm-6 col-lg-4 fade-in-up"
          style={{ animationDelay: `${(i % 6) * 60}ms` }}
          key={product.id}
        >
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite ? isFavorite(product.id) : false}
          />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
