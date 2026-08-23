import { useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";

function CartSummary({ items, total }) {
  const [showNotice, setShowNotice] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="card p-3">
      <h5 className="mb-3">{t("orderSummary")}</h5>
      <p className="mb-1">
        {t("items")}: {items.length}
      </p>
      <h5 className="fw-bold">
        {t("total")}: {total} {t("egp")}
      </h5>

      <button
        className="btn btn-primary mt-2"
        onClick={() => setShowNotice(true)}
        disabled={items.length === 0}
      >
        {t("checkout")}
      </button>

      {showNotice && (
        <p className="text-muted small mt-2 mb-0">{t("checkoutNotice")}</p>
      )}
    </div>
  );
}

export default CartSummary;
