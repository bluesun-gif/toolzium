"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, Language } from "./languages";
import { TRANSLATIONS } from "./translations";

interface I18nContextType {
  currentLanguage: Language;
  setLanguage: (code: string) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  currentLanguage: SUPPORTED_LANGUAGES[0],
  setLanguage: () => {},
  t: (key: string, fallback?: string) => fallback || key,
});

const STORAGE_KEY = "toolzium_preferred_language";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [langCode, setLangCode] = useState<string>(DEFAULT_LANGUAGE);

  useEffect(() => {
    // Check URL search parameter ?lang=
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    const storedLang = localStorage.getItem(STORAGE_KEY);

    const initial = urlLang || storedLang || DEFAULT_LANGUAGE;
    const matched = SUPPORTED_LANGUAGES.find((l) => l.code === initial);
    if (matched) {
      setLangCode(matched.code);
    }
  }, []);

  const handleSetLanguage = (code: string) => {
    const matched = SUPPORTED_LANGUAGES.find((l) => l.code === code);
    if (matched) {
      setLangCode(matched.code);
      localStorage.setItem(STORAGE_KEY, matched.code);

      // Set document dir for RTL languages (e.g. Arabic)
      if (typeof document !== "undefined") {
        document.documentElement.dir = matched.dir || "ltr";
        document.documentElement.lang = matched.code;
      }
    }
  };

  const currentLanguage =
    SUPPORTED_LANGUAGES.find((l) => l.code === langCode) || SUPPORTED_LANGUAGES[0];

  const t = (key: string, fallback?: string): string => {
    const dict = TRANSLATIONS[currentLanguage.code] || TRANSLATIONS[DEFAULT_LANGUAGE];
    return dict[key] || TRANSLATIONS[DEFAULT_LANGUAGE]?.[key] || fallback || key;
  };

  return (
    <I18nContext.Provider value={{ currentLanguage, setLanguage: handleSetLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}
