import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAppDispatch, useAppSelector, useTheme } from "@/hooks";
import { ThemeMode } from "../app-settings";
import { setTheme } from "../services/appSettingsSlice";
import { useTranslation } from "react-i18next";

const THEME_OPTIONS: { value: ThemeMode; labelKey: string; icon: string }[] = [
  {
    value: "system",
    labelKey: "cms.theme-system",
    icon: "theme-light-dark",
  },
  { value: "light", labelKey: "cms.theme-light", icon: "weather-sunny" },
  { value: "dark", labelKey: "cms.theme-dark", icon: "weather-night" },
];

export default function Theme() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { colors, radius, typography, design } = useTheme();
  const currentTheme = useAppSelector((s) => s.appSettings.theme);

  function handleTheme(mode: ThemeMode) {
    dispatch(setTheme(mode));
  }

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={[
          styles.sectionTitle,
          { color: colors.textSecondary, fontFamily: typography.mono },
        ]}
      >
        {t("cms.theme").toUpperCase()}
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
        {THEME_OPTIONS.map((opt, idx) => {
          const active = currentTheme === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              onPress={() => handleTheme(opt.value)}
              style={[
                styles.optionRow,
                idx < THEME_OPTIONS.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <View style={styles.optionLeft}>
                <View
                  style={[
                    styles.iconWrap,
                    {
                      backgroundColor: active
                        ? colors.primaryLight
                        : colors.surfaceAlt,
                      borderRadius: radius.md,
                    },
                  ]}
                >
                  <MCIcons
                    name={opt.icon as any}
                    size={20}
                    color={active ? colors.primary : colors.textSecondary}
                  />
                </View>
                <Text
                  style={[
                    { fontSize: 15 },
                    {
                      color: active ? colors.primary : colors.text,
                      fontFamily: active
                        ? typography.bodyBold
                        : typography.body,
                    },
                  ]}
                >
                  {t(opt.labelKey)}
                </Text>
              </View>

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
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 6,
  },
});
