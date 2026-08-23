import { useLanguage } from "../hooks/useLanguage";

/**
 * About page — all copy comes from the i18n translations file so the
 * page switches between English and Arabic with the AR/EN toggle.
 */
function About() {
  const { t } = useLanguage();

  return (
    <div className="container py-5" style={{ maxWidth: "720px" }}>
      <h1 className="h3 mb-4">{t("aboutTitle")}</h1>

      <h2 className="h5">{t("aboutWhatTitle")}</h2>
      <p>{t("aboutWhatBody")}</p>

      <h2 className="h5">{t("aboutBuyTitle")}</h2>
      <p>{t("aboutBuyBody")}</p>

      <h2 className="h5">{t("aboutWhyTitle")}</h2>
      <p>{t("aboutWhyBody")}</p>

      <h2 className="h5">{t("aboutTechTitle")}</h2>
      <ul>
        <li>React 19 + Vite</li>
        <li>React Router</li>
        <li>Bootstrap 5</li>
        <li>json-server (mock API)</li>
      </ul>
    </div>
  );
}

export default About;
