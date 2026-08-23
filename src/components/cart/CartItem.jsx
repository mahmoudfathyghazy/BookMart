import { useLanguage } from "../../hooks/useLanguage";
import { getLocalizedName } from "../../utils/localization";
import { getEffectivePrice } from "../../utils/pricing";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const { lang, t } = useLanguage();
  const unitPrice = getEffectivePrice(item);

  return (
    <div className="d-flex align-items-center gap-3 border-bottom py-3">
      <img
        src={item.image}
        alt={getLocalizedName(item, lang)}
        width="80"
        height="80"
        style={{ objectFit: "cover", borderRadius: "6px" }}
      />

      <div className="flex-grow-1">
        <h6 className="mb-1">{getLocalizedName(item, lang)}</h6>
        <p className="mb-0 text-muted">
          {unitPrice} {t("egp")}
          {item.onSale && item.discountPrice && (
            <span className="bm-price-old ms-2">{item.price}</span>
          )}
        </p>
      </div>

      <div className="d-flex align-items-center">
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => onDecrease(item.id)}
        >
          -
        </button>
        <span className="mx-2">{item.quantity}</span>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => onIncrease(item.id)}
        >
          +
        </button>
      </div>

      <button className="btn btn-danger btn-sm" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;
