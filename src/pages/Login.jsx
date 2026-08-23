import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login, error } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // If a route guard bounced the user here (e.g. /admin), send them
  // back to that page after a successful login.
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const success = await login(email, password);
    setSubmitting(false);
    if (success) navigate(from, { replace: true });
  };

  return (
    <div className="container py-5" style={{ maxWidth: "420px" }}>
      <h1 className="h3 mb-4">{t("login")}</h1>

      <form onSubmit={handleSubmit}>
        <Input
          label={t("contactEmail")}
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label={t("passwordLabel")}
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-danger small">{t(error)}</p>}

        <Button type="submit" disabled={submitting} className="w-100">
          {submitting ? t("loggingIn") : t("login")}
        </Button>
      </form>

      <p className="mt-3 text-center">
        {t("noAccount")} <Link to="/register">{t("register")}</Link>
      </p>
    </div>
  );
}

export default Login;
