import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

/**
 * Global footer used by both public/user and admin layouts.
 * Uses Bootstrap utility classes and the same colour palette
 * as the rest of the application.
 */
function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bm-footer mt-auto py-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <p className="mb-2 mb-md-0">
          &copy; {new Date().getFullYear()} {t("brand")}.
        </p>
        <div className="d-flex gap-3">
          <Link to="/about" className="bm-footer__link">
            {t("about")}
          </Link>
          <Link to="/contact" className="bm-footer__link">
            {t("contact")}
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
