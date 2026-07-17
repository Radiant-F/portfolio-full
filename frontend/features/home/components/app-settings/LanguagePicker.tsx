import { Text, View } from "react-native";
import React from "react";
import { LANGUAGES } from "@/constants/language";
import ButtonLanguage from "../ButtonLanguage";
import { useTranslation } from "react-i18next";
import { setLanguage } from "@/locale/i18n";
import { usePublicTheme } from "@/hooks";

export default function LanguagePicker() {
  const { t, i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  const theme = usePublicTheme();

  return (
    <View style={{ gap: 10 }}>
      <Text style={{ color: theme.textSecondary }}>{t("settings.language")}</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {LANGUAGES.map((lang) => (
          <ButtonLanguage
            key={lang.locale}
            onPress={() => setLanguage(lang.locale)}
            locale={lang.locale}
            label={t(`settings.lang-${lang.locale}`)}
            selected={lang.locale === selectedLanguage}
          />
        ))}
      </View>
    </View>
  );
}
