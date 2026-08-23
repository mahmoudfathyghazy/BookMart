import { useEffect, useState } from "react";
import { LanguageContext } from "./LanguageContext";
import { translations } from "../i18n/translations";

const LANG_KEY = "bookmart:lang";

/** Restores the language chosen in a previous session. */
function readStoredLang() {
  try {
    return localStorage.getItem(LANG_KEY) === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLang);

  // Persist the choice and apply direction on every change.
  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      // storage unavailable -> language simply not persisted
    }
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
