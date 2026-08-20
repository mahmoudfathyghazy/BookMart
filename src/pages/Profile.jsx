import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/login" replace />;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container py-5" style={{ maxWidth: "420px" }}>
      <h1 className="h3 mb-4">Profile</h1>

      <div className="card p-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>

        <button className="btn btn-outline-danger mt-2" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
