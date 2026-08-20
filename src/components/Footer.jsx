import { useLanguage } from "../hooks/useLanguage";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-dark text-light mt-auto py-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <p className="mb-2 mb-md-0">
          &copy; {new Date().getFullYear()} {t("brand")}.
        </p>
        <div className="d-flex gap-3">
          <a href="/about" className="text-light text-decoration-none">{t("about")}</a>
          <a href="/contact" className="text-light text-decoration-none">{t("contact")}</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
