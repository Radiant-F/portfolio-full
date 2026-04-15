import { storage } from "@/api/storage";
import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import id from "./id.json";
import sundanese from "./sundanese.json";

const LANGUAGE_KEY = "app.language";

const isClient = typeof window !== "undefined"; // Prevent SSR issue on web
const savedLang = isClient ? storage.getString(LANGUAGE_KEY) : undefined;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    id: { translation: id },
    sundanese: { translation: sundanese },
  },
  lng: savedLang ?? getLocales()[0]?.languageCode ?? "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export function setLanguage(lang: string) {
  if (isClient) {
    storage.set(LANGUAGE_KEY, lang);
  }
  i18n.changeLanguage(lang);
}

export default i18n;
