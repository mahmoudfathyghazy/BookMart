import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="container py-5 text-center">
      <h1 className="display-4">{t("notFoundTitle")}</h1>
      <p className="text-muted mb-4">{t("notFoundBody")}</p>
      <Link to="/" className="btn btn-primary">
        {t("backHome")}
      </Link>
    </div>
  );
}

export default NotFound;
