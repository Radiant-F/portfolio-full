import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, { FadeInDown } from "react-native-reanimated";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import { useMeQuery } from "@/features/auth";
import { useTheme } from "@/hooks";
import { Button } from "@/components";

type CardConfig = {
  label: string;
  detail: string;
  icon: string;
  route: string;
};

export default function Dashboard() {
  const { width } = useWindowDimensions();
  const { colors, spacing, radius, typography, design, resolvedMode } =
    useTheme();
  const { t } = useTranslation();
  const { data } = useMeQuery(null);
  const isWide = width >= 940;
  const cardWidth = width >= 1180 ? "31.5%" : width >= 760 ? "48.5%" : "100%";

  const CARDS: CardConfig[] = [
    {
      label: t("cms.about.title"),
      detail: "Narrative and long-form profile content",
      icon: "account-outline",
      route: "/(app)/about",
    },
    {
      label: t("cms.tag.title"),
      detail: "Taxonomy and reusable labels",
      icon: "tag-multiple-outline",
      route: "/(app)/tag",
    },
    {
      label: t("cms.skill.title"),
      detail: "Capability groups and nested details",
      icon: "lightning-bolt-outline",
      route: "/(app)/skill",
    },
    {
      label: t("cms.experience.title"),
      detail: "Timeline entries and achievements",
      icon: "briefcase-outline",
      route: "/(app)/experience",
    },
    {
      label: t("cms.work.title"),
      detail: "Portfolio pieces, links, screenshots, tags",
      icon: "laptop",
      route: "/(app)/work",
    },
    {
      label: t("cms.contact.title"),
      detail: "Contact surfaces and platform links",
      icon: "card-account-details-outline",
      route: "/(app)/contact",
    },
    {
      label: t("cms.settings"),
      detail: "Theme, language, and design preferences",
      icon: "cog-outline",
      route: "/(app)/settings",
    },
  ];

  const signalColors = [
    colors.primary,
    colors.accent,
    colors.success,
    colors.warning,
    colors.primary,
    colors.accent,
    colors.textSecondary,
  ];

  const summaryCards = [
    {
      label: "Modules",
      value: String(CARDS.length),
      icon: "view-grid-plus-outline",
    },
    { label: "Design", value: design.label, icon: design.icon },
    {
      label: "Mode",
      value: resolvedMode === "dark" ? "Dark" : "Light",
      icon: "theme-light-dark",
    },
  ];

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { padding: spacing.lg, paddingBottom: spacing.xxl + spacing.section },
        ]}
      >
        <Animated.View
          entering={FadeInDown.duration(300)}
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
              {
                backgroundColor: colors.heroGlow,
                borderRadius: radius.xl * 1.1,
              },
            ]}
          />

          <View
            style={[styles.heroContent, !isWide && styles.heroContentStack]}
          >
            <View style={styles.heroMain}>
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
                {design.label.toUpperCase()}
              </Text>
              <Text
                style={[
                  styles.heroTitle,
                  { color: colors.text, fontFamily: typography.display },
                ]}
              >
                Portfolio command deck
              </Text>
              <Text
                style={[
                  styles.heroCopy,
                  { color: colors.textSecondary, fontFamily: typography.body },
                ]}
              >
                Manage every protected content surface from one adaptive CMS
                shell. This first implementation pass wires the design system
                into the dashboard, navigation, settings, and shared primitives.
              </Text>

              <View style={styles.heroActionRow}>
                <Button
                  onPress={() => router.push("/(app)/settings")}
                  style={[
                    styles.primaryAction,
                    {
                      backgroundColor: colors.primary,
                      borderRadius: radius.pill,
                    },
                  ]}
                >
                  <MCIcons
                    name="palette-outline"
                    size={18}
                    color={colors.primaryForeground}
                  />
                  <Text
                    style={{
                      color: colors.primaryForeground,
                      fontFamily: typography.bodyBold,
                      fontSize: 14,
                    }}
                  >
                    Open design selector
                  </Text>
                </Button>

                <Button
                  onPress={() => router.navigate("/(public)")}
                  style={[
                    styles.secondaryAction,
                    {
                      backgroundColor: colors.surfaceAlt,
                      borderColor: colors.cardBorder,
                      borderRadius: radius.pill,
                    },
                  ]}
                >
                  <MCIcons
                    name="open-in-new"
                    size={18}
                    color={colors.textSecondary}
                  />
                  <Text
                    style={{
                      color: colors.textSecondary,
                      fontFamily: typography.body,
                      fontSize: 14,
                    }}
                  >
                    View site
                  </Text>
                </Button>
              </View>
            </View>

            <View
              style={[
                styles.heroPanel,
                {
                  backgroundColor: colors.heroEnd,
                  borderColor: colors.cardBorder,
                  borderRadius: radius.lg,
                },
              ]}
            >
              <Text
                style={[
                  styles.panelEyebrow,
                  {
                    color: colors.textMuted,
                    fontFamily: typography.mono,
                    letterSpacing: typography.eyebrowSpacing * 0.8,
                  },
                ]}
              >
                ACTIVE OPERATOR
              </Text>
              <Text
                style={[
                  styles.panelValue,
                  { color: colors.text, fontFamily: typography.heading },
                ]}
              >
                {data?.email ?? "admin@portfolio"}
              </Text>
              <Text
                style={[
                  styles.panelCopy,
                  { color: colors.textSecondary, fontFamily: typography.body },
                ]}
              >
                {design.summary}
              </Text>

              <View style={styles.metricColumn}>
                {summaryCards.map((item) => (
                  <View
                    key={item.label}
                    style={[
                      styles.metricRow,
                      {
                        borderBottomColor: colors.cardBorder,
                      },
                    ]}
                  >
                    <View style={styles.metricLabelRow}>
                      <MCIcons
                        name={item.icon as any}
                        size={16}
                        color={colors.textSecondary}
                      />
                      <Text
                        style={{
                          color: colors.textSecondary,
                          fontFamily: typography.body,
                          fontSize: 13,
                        }}
                      >
                        {item.label}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: colors.text,
                        fontFamily: typography.bodyBold,
                        fontSize: 13,
                      }}
                    >
                      {item.value}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Animated.View>

        <View style={styles.summaryRow}>
          {summaryCards.map((item, index) => (
            <Animated.View
              key={item.label}
              entering={FadeInDown.delay(70 + index * 40).duration(280)}
              style={[
                styles.summaryCard,
                {
                  width: isWide ? "32%" : "100%",
                  backgroundColor: colors.card,
                  borderColor: colors.cardBorder,
                  borderWidth: design.chrome.borderWeight,
                  borderRadius: radius.lg,
                },
              ]}
            >
              <View
                style={[
                  styles.summaryIcon,
                  {
                    backgroundColor: colors.primaryLight,
                    borderRadius: radius.md,
                  },
                ]}
              >
                <MCIcons
                  name={item.icon as any}
                  size={18}
                  color={colors.primary}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: colors.textMuted,
                    fontFamily: typography.body,
                    fontSize: 12,
                  }}
                >
                  {item.label}
                </Text>
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: typography.bodyBold,
                    fontSize: 15,
                    marginTop: 2,
                  }}
                >
                  {item.value}
                </Text>
              </View>
            </Animated.View>
          ))}
        </View>

        <Animated.View entering={FadeInDown.delay(180).duration(320)}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text, fontFamily: typography.heading },
              ]}
            >
              Content surfaces
            </Text>
            <Text
              style={{
                color: colors.textSecondary,
                fontFamily: typography.body,
                fontSize: 14,
              }}
            >
              Each module stays functional while the visual system changes
              underneath it.
            </Text>
          </View>

          {/* Content */}
          <View style={styles.grid}>
            {CARDS.map((card, idx) => (
              <Animated.View
                key={card.route}
                entering={FadeInDown.delay(idx * 50).duration(300)}
                style={[styles.cardWrap, { width: cardWidth }]}
              >
                <Button
                  onPress={() => router.push(card.route as any)}
                  style={[
                    styles.card,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.cardBorder,
                      borderWidth: design.chrome.borderWeight,
                      borderRadius: radius.lg,
                      padding: spacing.lg,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.cardIconWrap,
                      {
                        backgroundColor: signalColors[idx] + "1A",
                        borderRadius: radius.md,
                      },
                    ]}
                  >
                    <MCIcons
                      name={card.icon as any}
                      size={26}
                      color={signalColors[idx]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.cardLabel,
                      { color: colors.text, fontFamily: typography.bodyBold },
                    ]}
                  >
                    {card.label}
                  </Text>
                  <Text
                    style={{
                      color: colors.textSecondary,
                      fontFamily: typography.body,
                      fontSize: 13,
                      lineHeight: 19,
                      marginTop: 6,
                    }}
                  >
                    {card.detail}
                  </Text>
                  <MCIcons
                    name="chevron-right"
                    size={16}
                    color={colors.textMuted}
                    style={styles.cardChevron}
                  />
                </Button>
              </Animated.View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    gap: 18,
  },
  hero: {
    overflow: "hidden",
    position: "relative",
  },
  heroGlow: {
    position: "absolute",
    width: 260,
    height: 260,
    right: -80,
    top: -90,
  },
  heroContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 18,
  },
  heroContentStack: {
    flexDirection: "column",
  },
  heroMain: {
    flex: 1,
  },
  heroEyebrow: {
    fontSize: 10,
  },
  heroTitle: {
    fontSize: 30,
    marginTop: 10,
  },
  heroCopy: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 14,
    maxWidth: 620,
  },
  heroActionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
  },
  primaryAction: {
    minHeight: 46,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  secondaryAction: {
    minHeight: 46,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
  },
  heroPanel: {
    minWidth: 280,
    maxWidth: 360,
    borderWidth: 1,
    padding: 18,
    gap: 10,
  },
  panelEyebrow: {
    fontSize: 10,
  },
  panelValue: {
    fontSize: 20,
  },
  panelCopy: {
    fontSize: 13,
    lineHeight: 20,
  },
  metricColumn: {
    marginTop: 4,
  },
  metricRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  metricLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
  },
  summaryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
  },
  summaryIcon: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeader: {
    marginTop: 4,
    marginBottom: 16,
    gap: 6,
  },
  sectionTitle: {
    fontSize: 22,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  cardWrap: {},
  card: {
    minHeight: 200,
  },
  cardIconWrap: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  cardLabel: {
    fontSize: 14,
  },
  cardChevron: {
    marginTop: 18,
  },
});
