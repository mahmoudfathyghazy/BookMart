import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email.";
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
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
      <h1 className="h3 mb-4">Contact Us</h1>

      {sent && (
        <div className="alert alert-success">
          Your message has been sent successfully.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange("name")}
          error={errors.name}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange("email")}
          error={errors.email}
          required
        />
        <Input
          label="Subject"
          name="subject"
          value={form.subject}
          onChange={handleChange("subject")}
          error={errors.subject}
          required
        />
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message <span className="text-danger">*</span>
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

        <Button type="submit" className="w-100">Send Message</Button>
      </form>
    </div>
  );
}

export default Contact;
