import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../hooks/useLanguage";

/**
 * Layout wrapper for the admin area.
 * Reuses the main navbar/footer so the admin UI stays visually
 * consistent with the rest of the application, and adds a local
 * admin navigation strip for the dashboard and products pages.
 */
function AdminLayout() {
  const { t } = useLanguage();
  const linkClass = ({ isActive }) =>
    `list-group-item list-group-item-action ${isActive ? "active" : ""}`;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        <div className="container py-5">
          <div className="row g-4">
            {/* Admin sidebar navigation */}
            <div className="col-12 col-md-3 col-lg-2">
              <div className="list-group shadow-sm">
                <NavLink to="/admin" end className={linkClass}>
                  {t("adminDashboard")}
                </NavLink>
                <NavLink to="/admin/products" className={linkClass}>
                  {t("dashboardProducts")}
                </NavLink>
              </div>
            </div>

            {/* Admin page content */}
            <div className="col-12 col-md-9 col-lg-10">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AdminLayout;
