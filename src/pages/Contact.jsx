import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useLanguage } from "../hooks/useLanguage";

/**
 * Contact page — labels, validation messages and the success alert all
 * come from the i18n translations file so the page switches between
 * English and Arabic with the AR/EN toggle.
 */
function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = t("nameRequired");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = t("emailInvalid");
    if (!form.subject.trim()) newErrors.subject = t("subjectRequired");
    if (!form.message.trim()) newErrors.message = t("messageRequired");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container py-5" style={{ maxWidth: "480px" }}>
      <h1 className="h3 mb-4">{t("contactTitle")}</h1>

      {sent && (
        <div className="alert alert-success">{t("contactSuccess")}</div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label={t("contactName")}
          name="name"
          value={form.name}
          onChange={handleChange("name")}
          error={errors.name}
          required
        />
        <Input
          label={t("contactEmail")}
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange("email")}
          error={errors.email}
          required
        />
        <Input
          label={t("contactSubject")}
          name="subject"
          value={form.subject}
          onChange={handleChange("subject")}
          error={errors.subject}
          required
        />
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            {t("contactMessage")} <span className="text-danger">*</span>
          </label>
          <textarea
            id="message"
            className={`form-control ${errors.message ? "is-invalid" : ""}`}
            rows="4"
            value={form.message}
            onChange={handleChange("message")}
          />
          {errors.message && <div className="invalid-feedback">{errors.message}</div>}
        </div>

        <Button type="submit" className="w-100">{t("contactSend")}</Button>
      </form>
    </div>
  );
}

export default Contact;
