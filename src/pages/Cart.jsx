import { Link } from "react-router-dom";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyState from "../components/EmptyState";
import { useCart } from "../hooks/useCart";
import { useLanguage } from "../hooks/useLanguage";

function Cart() {
  const { items, total, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const { t } = useLanguage();

  return (
    <div className="container py-5">
      <h1 className="h3 mb-4">{t("yourCart")}</h1>

      {items.length === 0 ? (
        <EmptyState message={t("cartEmpty")} />
      ) : (
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeFromCart}
              />
            ))}
            <Link to="/market" className="d-inline-block mt-3 text-decoration-none">
              &larr; {t("continueShopping")}
            </Link>
          </div>
          <div className="col-12 col-lg-4">
            <CartSummary items={items} total={total} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
