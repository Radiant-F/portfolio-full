import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAppDispatch, useAppSelector, useTheme } from "@/hooks";
import { setDesign, setTheme, setLanguage } from "@/features/app-settings";
import type { ThemeMode } from "@/features/app-settings";
import i18n from "@/locale/i18n";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import {
  CMS_DESIGN_ORDER,
  getDesignDefinition,
  type DesignVariant,
} from "@/constants/theme";

const THEME_OPTIONS: { value: ThemeMode; labelKey: string; icon: string }[] = [
  { value: "system", labelKey: "cms.theme-system", icon: "theme-light-dark" },
  { value: "light", labelKey: "cms.theme-light", icon: "weather-sunny" },
  { value: "dark", labelKey: "cms.theme-dark", icon: "weather-night" },
];

const LANGUAGE_OPTIONS = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "he", label: "עברית" },
  { code: "id", label: "Indonesia" },
  { code: "sundanese", label: "Basa Sunda" },
  { code: "ur", label: "اردو" },
];

export default function Settings() {
  const { width } = useWindowDimensions();
  const { colors, isDark, radius, spacing, typography, design, resolvedMode } =
    useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((s) => s.appSettings.theme);
  const currentLanguage = useAppSelector((s) => s.appSettings.language);
  const currentDesign = useAppSelector((s) => s.appSettings.design);
  const isWide = width >= 920;

  function handleTheme(mode: ThemeMode) {
    dispatch(setTheme(mode));
  }

  function handleDesign(nextDesign: DesignVariant) {
    dispatch(setDesign(nextDesign));
  }

  function handleLanguage(code: string) {
    dispatch(setLanguage(code));
    i18n.changeLanguage(code);
  }

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { padding: spacing.lg, paddingBottom: spacing.section + spacing.xl },
        ]}
      >
        <Animated.View entering={FadeInDown.duration(300)}>
          <View
            style={[
              styles.hero,
              {
                backgroundColor: colors.surfaceRaised,
                borderColor: colors.cardBorder,
                borderWidth: design.chrome.borderWeight,
                borderRadius: radius.xl,
                padding: spacing.xl,
              },
            ]}
          >
            <View
              style={[
                styles.heroGlow,
                { backgroundColor: colors.heroGlow, borderRadius: radius.xl },
              ]}
            />

            <Text
              style={[
                styles.heroEyebrow,
                {
                  color: colors.textMuted,
                  fontFamily: typography.mono,
                  letterSpacing: typography.eyebrowSpacing,
                },
              ]}
            >
              CMS SETTINGS
            </Text>
            <Text
              style={[
                styles.pageTitle,
                { color: colors.text, fontFamily: typography.display },
              ]}
            >
              Shape the admin shell
            </Text>
            <Text
              style={{
                color: colors.textSecondary,
                fontFamily: typography.body,
                fontSize: 14,
                lineHeight: 22,
                maxWidth: 720,
              }}
            >
              Select the visual direction for the protected CMS, then fine-tune
              theme mode and language. Changes apply instantly and persist
              across launches.
            </Text>

            <View style={styles.heroMetaRow}>
              <View
                style={[
                  styles.heroBadge,
                  {
                    backgroundColor: colors.badgeBackground,
                    borderRadius: radius.pill,
                  },
                ]}
              >
                <MCIcons
                  name={design.icon as any}
                  size={14}
                  color={colors.badgeForeground}
                />
                <Text
                  style={{
                    color: colors.badgeForeground,
                    fontFamily: typography.bodyBold,
                    fontSize: 12,
                  }}
                >
                  {design.label}
                </Text>
              </View>

              <View
                style={[
                  styles.heroBadge,
                  {
                    backgroundColor: colors.surfaceAlt,
                    borderRadius: radius.pill,
                  },
                ]}
              >
                <MCIcons
                  name="theme-light-dark"
                  size={14}
                  color={colors.textSecondary}
                />
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontFamily: typography.body,
                    fontSize: 12,
                  }}
                >
                  {resolvedMode === "dark"
                    ? t("cms.theme-dark")
                    : t("cms.theme-light")}
                </Text>
              </View>
            </View>
          </View>

          <Text
            style={[
              styles.sectionTitle,
              { color: colors.textSecondary, fontFamily: typography.mono },
            ]}
          >
            DESIGN
          </Text>

          <View style={styles.designGrid}>
            {CMS_DESIGN_ORDER.map((designKey, index) => {
              const option = getDesignDefinition(designKey);
              const preview = isDark ? option.colors.dark : option.colors.light;
              const active = currentDesign === designKey;

              return (
                <Animated.View
                  key={designKey}
                  entering={FadeInDown.delay(index * 35).duration(260)}
                  style={{ width: isWide ? "48.8%" : "100%" }}
                >
                  <TouchableOpacity
                    onPress={() => handleDesign(designKey)}
                    style={[
                      styles.designCard,
                      {
                        backgroundColor: active
                          ? colors.card
                          : colors.surfaceRaised,
                        borderColor: active
                          ? colors.primary
                          : colors.cardBorder,
                        borderWidth: active
                          ? Math.max(2, design.chrome.borderWeight)
                          : design.chrome.borderWeight,
                        borderRadius: radius.lg,
                      },
                    ]}
                  >
                    <View style={styles.designCardTop}>
                      <View>
                        <Text
                          style={{
                            color: colors.text,
                            fontFamily: typography.bodyBold,
                            fontSize: 16,
                          }}
                        >
                          {option.label}
                        </Text>
                        <Text
                          style={{
                            color: colors.textSecondary,
                            fontFamily: typography.body,
                            fontSize: 13,
                            lineHeight: 20,
                            marginTop: 6,
                          }}
                        >
                          {option.summary}
                        </Text>
                      </View>

                      {active ? (
                        <MCIcons
                          name="check-circle"
                          size={22}
                          color={colors.primary}
                        />
                      ) : null}
                    </View>

                    <View style={styles.previewRow}>
                      {[
                        preview.heroStart,
                        preview.heroEnd,
                        preview.primary,
                        preview.accent,
                      ].map((swatch) => (
                        <View
                          key={swatch}
                          style={[
                            styles.previewSwatch,
                            {
                              backgroundColor: swatch,
                              borderRadius: radius.sm,
                            },
                          ]}
                        />
                      ))}
                    </View>

                    <View
                      style={[
                        styles.designPreviewCard,
                        {
                          backgroundColor: preview.surface,
                          borderColor: preview.cardBorder,
                          borderRadius: radius.md,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.previewHeader,
                          { borderBottomColor: preview.cardBorder },
                        ]}
                      >
                        <MCIcons
                          name={option.icon as any}
                          size={16}
                          color={preview.primary}
                        />
                        <Text
                          style={{
                            color: preview.text,
                            fontFamily: typography.bodyBold,
                            fontSize: 13,
                          }}
                        >
                          CMS shell preview
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: preview.textSecondary,
                          fontFamily: typography.body,
                          fontSize: 12,
                        }}
                      >
                        Header, dashboard cards, list rows, and forms inherit
                        this system.
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>

          <View style={[styles.twoColumnRow, isWide && styles.twoColumnWide]}>
            <View style={styles.column}>
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
                  styles.card,
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
                            color={
                              active ? colors.primary : colors.textSecondary
                            }
                          />
                        </View>
                        <Text
                          style={[
                            styles.optionLabel,
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
                        <MCIcons
                          name="check-circle"
                          size={20}
                          color={colors.primary}
                        />
                      ) : null}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.column}>
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
                  styles.card,
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
                          styles.optionLabel,
                          {
                            color: active ? colors.primary : colors.text,
                            fontFamily: active
                              ? typography.bodyBold
                              : typography.body,
                          },
                        ]}
                      >
                        {lang.label}
                      </Text>

                      {active ? (
                        <MCIcons
                          name="check-circle"
                          size={20}
                          color={colors.primary}
                        />
                      ) : null}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          <View
            style={[
              styles.infoCard,
              {
                backgroundColor: colors.primaryLight,
                borderColor: colors.primary,
                borderRadius: radius.lg,
              },
            ]}
          >
            <MCIcons
              name="information-outline"
              size={16}
              color={colors.primary}
            />
            <Text
              style={[
                styles.infoText,
                { color: colors.primary, fontFamily: typography.body },
              ]}
            >
              {`${design.label} is active. Theme and language changes continue to apply across all CMS routes.`}
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: { gap: 18 },
  hero: {
    position: "relative",
    overflow: "hidden",
    gap: 12,
  },
  heroGlow: {
    position: "absolute",
    width: 220,
    height: 220,
    right: -50,
    top: -80,
  },
  heroEyebrow: {
    fontSize: 10,
  },
  heroMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  pageTitle: { fontSize: 28, marginTop: 6 },
  sectionTitle: {
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 6,
  },
  designGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  designCard: {
    padding: 16,
    gap: 12,
  },
  designCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  previewRow: {
    flexDirection: "row",
    gap: 8,
  },
  previewSwatch: {
    width: 32,
    height: 18,
  },
  designPreviewCard: {
    borderWidth: 1,
    padding: 12,
    gap: 10,
  },
  previewHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  twoColumnRow: {
    gap: 12,
  },
  twoColumnWide: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  column: {
    flex: 1,
  },
  card: {
    overflow: "hidden",
  },
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
  optionLabel: {
    fontSize: 15,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    padding: 12,
  },
  infoText: {
    fontSize: 13,
    flex: 1,
  },
});
