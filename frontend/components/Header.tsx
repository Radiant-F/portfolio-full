import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePathname } from "expo-router";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import { useTheme } from "@/hooks";

type Props = {
  navigation?: DrawerNavigationProp<any>;
};

const BREAKPOINT = 768;

const routes = [
  { name: "index", labelKey: "cms.dashboard", icon: "view-dashboard-outline" },
  { name: "about", labelKey: "cms.about.title", icon: "account-outline" },
  { name: "tag", labelKey: "cms.tag.title", icon: "tag-multiple-outline" },
  {
    name: "skill",
    labelKey: "cms.skill.title",
    icon: "lightning-bolt-outline",
  },
  {
    name: "experience",
    labelKey: "cms.experience.title",
    icon: "briefcase-outline",
  },
  { name: "work", labelKey: "cms.work.title", icon: "laptop" },
  {
    name: "contact",
    labelKey: "cms.contact.title",
    icon: "card-account-details-outline",
  },
  { name: "settings", labelKey: "cms.settings", icon: "cog-outline" },
];

export default function Header({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const pathname = usePathname();
  const { t } = useTranslation();
  const { colors, spacing, radius, typography, design } = useTheme();
  const isNarrow = width < BREAKPOINT;
  const activeSegment = pathname.split("/").filter(Boolean)[1] ?? "index";
  const activeRoute =
    routes.find((route) => route.name === activeSegment) ?? routes[0];

  if (!navigation) return null;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing.sm,
          paddingBottom: spacing.md,
          paddingHorizontal: spacing.lg,
          backgroundColor: colors.headerBackground,
          borderBottomColor: colors.cardBorder,
          borderBottomWidth: design.chrome.borderWeight,
        },
      ]}
    >
      <View style={styles.leading}>
        <Button
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          style={[
            styles.menuButton,
            {
              backgroundColor: colors.surfaceAlt,
              borderColor: colors.cardBorder,
              borderRadius: radius.md,
            },
          ]}
        >
          <MCIcons name="menu" size={20} color={colors.text} />
        </Button>

        <View style={styles.titleBlock}>
          <Text
            style={[
              styles.eyebrow,
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
              styles.title,
              {
                color: colors.headerForeground,
                fontFamily: typography.heading,
              },
            ]}
          >
            {t(activeRoute.labelKey)}
          </Text>
        </View>
      </View>

      {isNarrow ? (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: colors.badgeBackground,
              borderRadius: radius.pill,
            },
          ]}
        >
          <MCIcons
            name={activeRoute.icon as any}
            size={14}
            color={colors.badgeForeground}
          />
          <Text
            style={[
              styles.badgeText,
              {
                color: colors.badgeForeground,
                fontFamily: typography.bodyBold,
              },
            ]}
          >
            {t(activeRoute.labelKey)}
          </Text>
        </View>
      ) : (
        <View style={styles.navRow}>
          {routes.map((route) => (
            <Button
              key={route.name}
              onPress={() =>
                navigation.dispatch(DrawerActions.jumpTo(route.name))
              }
              style={[
                styles.navButton,
                {
                  backgroundColor:
                    route.name === activeRoute.name
                      ? colors.primaryLight
                      : colors.surface,
                  borderColor:
                    route.name === activeRoute.name
                      ? colors.primary
                      : colors.cardBorder,
                  borderRadius: radius.pill,
                },
              ]}
            >
              <MCIcons
                name={route.icon as any}
                size={16}
                color={
                  route.name === activeRoute.name
                    ? colors.primary
                    : colors.textSecondary
                }
              />
              <Text
                style={{
                  color:
                    route.name === activeRoute.name
                      ? colors.primary
                      : colors.textSecondary,
                  fontFamily:
                    route.name === activeRoute.name
                      ? typography.bodyBold
                      : typography.body,
                  fontSize: 13,
                }}
              >
                {t(route.labelKey)}
              </Text>
            </Button>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexShrink: 1,
  },
  titleBlock: {
    gap: 2,
  },
  eyebrow: {
    fontSize: 10,
  },
  menuButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  navButton: {
    minHeight: 38,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  badgeText: {
    fontSize: 12,
  },
});
