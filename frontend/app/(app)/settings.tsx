import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "@/hooks";
import { Design, Language, Theme } from "@/features/app-settings";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";

export default function Settings() {
  const { colors, radius, spacing, typography, design, resolvedMode } =
    useTheme();
  const { t } = useTranslation();

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

          <View style={{ height: 20 }} />

          <Design />

          <View style={{ height: 20 }} />

          <Theme />

          <View style={{ height: 20 }} />

          <Language />
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
});
