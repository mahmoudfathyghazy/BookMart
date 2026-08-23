import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const { register, error } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = t("nameRequired");
    if (!form.email.trim()) errors.email = t("emailRequired");
    if (!form.password) errors.password = t("passwordRequired");
    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = t("passwordsMatch");
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const success = await register(form);
    setSubmitting(false);
    if (success) navigate("/profile");
  };

  return (
    <div className="container py-5" style={{ maxWidth: "420px" }}>
      <h1 className="h3 mb-4">{t("register")}</h1>

      <form onSubmit={handleSubmit}>
        <Input
          label={t("contactName")}
          name="name"
          value={form.name}
          onChange={handleChange("name")}
          error={fieldErrors.name}
          required
        />
        <Input
          label={t("contactEmail")}
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange("email")}
          error={fieldErrors.email}
          required
        />
        <Input
          label={t("passwordLabel")}
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange("password")}
          error={fieldErrors.password}
          required
        />
        <Input
          label={t("confirmPassword")}
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange("confirmPassword")}
          error={fieldErrors.confirmPassword}
          required
        />

        {error && <p className="text-danger small">{t(error)}</p>}

        <Button type="submit" disabled={submitting} className="w-100">
          {submitting ? t("creatingAccount") : t("register")}
        </Button>
      </form>

      <p className="mt-3 text-center">
        {t("haveAccount")} <Link to="/login">{t("login")}</Link>
      </p>
    </div>
  );
}

export default Register;
