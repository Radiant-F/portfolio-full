import { useAppDispatch, useAppSelector, useTheme } from "@/hooks";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import i18n from "@/locale/i18n";
import { setLanguage } from "../services/appSettingsSlice";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

const LANGUAGE_OPTIONS = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "he", label: "עברית" },
  { code: "id", label: "Indonesia" },
  { code: "sundanese", label: "Basa Sunda" },
  { code: "ur", label: "اردو" },
];

export default function Language() {
  const dispatch = useAppDispatch();
  const { colors, radius, typography, design } = useTheme();
  const currentLanguage = useAppSelector((s) => s.appSettings.language);
  const { t } = useTranslation();

  function handleLanguage(code: string) {
    dispatch(setLanguage(code));
    i18n.changeLanguage(code);
  }

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={[
          styles.sectionTitle,
          { color: colors.textSecondary, fontFamily: typography.mono },
        ]}
      >
        {t("cms.language").toUpperCase()}
      </Text>

      <View
        style={[
          { overflow: "hidden" },
          {
            backgroundColor: colors.card,
            borderColor: colors.cardBorder,
            borderRadius: radius.lg,
            borderWidth: design.chrome.borderWeight,
          },
        ]}
      >
        {LANGUAGE_OPTIONS.map((lang, idx) => {
          const active =
            currentLanguage === lang.code ||
            (!currentLanguage && i18n.language === lang.code);
          return (
            <TouchableOpacity
              key={lang.code}
              onPress={() => handleLanguage(lang.code)}
              style={[
                styles.optionRow,
                idx < LANGUAGE_OPTIONS.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  { fontSize: 15 },
                  {
                    color: active ? colors.primary : colors.text,
                    fontFamily: active ? typography.bodyBold : typography.body,
                  },
                ]}
              >
                {lang.label}
              </Text>

              {active ? (
                <MCIcons name="check-circle" size={20} color={colors.primary} />
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  sectionTitle: {
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 6,
  },
});
