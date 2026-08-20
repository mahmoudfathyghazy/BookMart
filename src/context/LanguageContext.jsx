import { useEffect, useState } from "react";
import { LanguageContext } from "./language-context";
import { translations } from "../i18n/translations";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (key) => translations[lang]?.[key] ?? translations.en[key] ?? key;

  const value = { lang, toggleLanguage, t, isArabic: lang === "ar" };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}
