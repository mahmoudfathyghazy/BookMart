import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage";
import SearchBar from "./SearchBar";

function Navbar() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { lang, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const linkClass = ({ isActive }) =>
    `nav-link${isActive ? " active" : ""}`;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/market?search=${encodeURIComponent(search)}`);
  };

  return (
    <header className="bm-navbar sticky-top">
      {/* Row 1: brand + search + favorites + cart */}
      <div className="bm-navbar__top">
        <div className="container d-flex align-items-center gap-3 py-2">
          <Link to="/" className="bm-brand">
            {t("brand")}
          </Link>

          <form onSubmit={handleSearchSubmit} className="flex-grow-1 mx-2">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder={t("searchPlaceholder")}
            />
          </form>

          <Link to="/favorites" className="bm-icon-link" aria-label={t("favorites")}>
            ♥
          </Link>

          <Link to="/cart" className="bm-icon-link position-relative" aria-label={t("cart")}>
            🛒
            {cartCount > 0 && (
              <span className="bm-cart-badge">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>

      {/* Row 2: page links + dark mode + language + login */}
      <nav className="bm-navbar__bottom">
        <div className="container d-flex align-items-center flex-wrap gap-2 py-2">
          <ul className="nav flex-grow-1 mb-0">
            <li className="nav-item">
              <NavLink className={linkClass} to="/">{t("home")}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/market">{t("market")}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/about">{t("about")}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/contact">{t("contact")}</NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="bm-pill-btn"
              onClick={toggleTheme}
              aria-label={isDark ? t("lightMode") : t("darkMode")}
              title={isDark ? t("lightMode") : t("darkMode")}
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            <button
              type="button"
              className="bm-pill-btn"
              onClick={toggleLanguage}
              aria-label="Toggle language"
              title="EN / عربي"
            >
              {lang === "en" ? "AR" : "EN"}
            </button>

            {user ? (
              <>
                <NavLink className="bm-pill-btn" to="/profile">{user.name}</NavLink>
                <button className="bm-pill-btn" onClick={logout}>
                  {t("logout")}
                </button>
              </>
            ) : (
              <NavLink className="bm-pill-btn bm-pill-btn--primary" to="/login">
                {t("login")}
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
