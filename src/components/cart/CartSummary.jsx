import { useState } from "react";

function CartSummary({ items, total }) {
  const [showNotice, setShowNotice] = useState(false);

  return (
    <div className="card p-3">
      <h5 className="mb-3">Order Summary</h5>
      <p className="mb-1">Items: {items.length}</p>
      <h5 className="fw-bold">Total: {total} EGP</h5>

      <button
        className="btn btn-primary mt-2"
        onClick={() => setShowNotice(true)}
        disabled={items.length === 0}
      >
        Checkout
      </button>

      {showNotice && (
        <p className="text-muted small mt-2 mb-0">
          Checkout is not available in this university project.
        </p>
      )}
    </div>
  );
}

export default CartSummary;
