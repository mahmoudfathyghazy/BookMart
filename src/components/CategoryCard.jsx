import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link
      to={`/market?category=${category.slug}`}
      className="card text-decoration-none h-100 shadow-sm"
    >
      <div className="bm-product-img-wrap" style={{ height: "140px" }}>
        <img
          src={category.image}
          alt={category.name}
          className="w-100 h-100"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="card-body">
        <h6 className="card-title text-dark mb-0">{category.name}</h6>
      </div>
    </Link>
  );
}

export default CategoryCard;
