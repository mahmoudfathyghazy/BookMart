import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";

function Profile() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/login" replace />;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container py-5" style={{ maxWidth: "420px" }}>
      <h1 className="h3 mb-4">{t("profileTitle")}</h1>

      <div className="card p-4">
        <p>
          <strong>{t("nameLabel")}:</strong> {user.name}
        </p>
        <p>
          <strong>{t("emailLabel")}:</strong> {user.email}
        </p>
        <p>
          <strong>{t("roleLabel")}:</strong> {user.role}
        </p>

        <button className="btn btn-outline-danger mt-2" onClick={handleLogout}>
          {t("logout")}
        </button>
      </div>
    </div>
  );
}

export default Profile;
