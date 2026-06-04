import { storage } from "@/api/storage";
import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Alert, I18nManager, Platform } from "react-native";

import ar from "./ar.json";
import en from "./en.json";
import id from "./id.json";
import cn from "./cn.json";
import jp from "./jp.json";
import ru from "./ru.json";

const LANGUAGE_KEY = "app.language";

const RTL_LOCALES = ["ar"];

const isClient = typeof window !== "undefined"; // Prevent SSR issue on web
const savedLang = isClient ? storage.getString(LANGUAGE_KEY) : undefined;

i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
    en: { translation: en },
    id: { translation: id },
    cn: { translation: cn },
    jp: { translation: jp },
    ru: { translation: ru },
  },
  lng: savedLang ?? getLocales()[0]?.languageCode ?? "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Apply RTL direction on web initial
if (Platform.OS === "web" && isClient) {
  const isRTL = RTL_LOCALES.includes(i18n.language);
  document.documentElement.dir = isRTL ? "rtl" : "ltr";
}

export async function setLanguage(lang: string) {
  const isRTL = RTL_LOCALES.includes(lang);
  const rtlChanging = Platform.OS !== "web" && I18nManager.isRTL !== isRTL;

  if (rtlChanging) {
    const previousLang = i18n.language;
    return new Promise<void>((resolve) => {
      Alert.alert(
        "Restart Required",
        "Switching between RTL and LTR languages requires an app restart. Continue?",
        [
          { text: "Cancel", style: "cancel", onPress: () => resolve() },
          {
            text: "Restart",
            style: "destructive",
            onPress: async () => {
              if (isClient) storage.set(LANGUAGE_KEY, lang);
              await i18n.changeLanguage(lang);
              I18nManager.forceRTL(isRTL);
              const Updates = await import("expo-updates");
              await Updates.reloadAsync();
            },
          },
        ],
      );
    });
  }

  // No restart needed
  if (isClient) storage.set(LANGUAGE_KEY, lang);
  await i18n.changeLanguage(lang);

  if (Platform.OS === "web") {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }
}

export default i18n;
