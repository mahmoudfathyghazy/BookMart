/**
 * Returns the price a customer actually pays for a product.
 * Sale items use `discountPrice`; everything else uses `price`.
 * Used by the cart context and line items so totals never show
 * pre-discount amounts.
 */
export function getEffectivePrice(product) {
  return product.onSale && product.discountPrice
    ? product.discountPrice
    : product.price;
}
