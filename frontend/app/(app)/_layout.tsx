import { Drawer } from "expo-router/drawer";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import { Header } from "@/components";
import { useTheme } from "@/hooks";
import { useTranslation } from "react-i18next";

// Screens hidden from drawer (detail / create sub-routes)
const HIDDEN_ROUTES = [
  "contact/[id]",
  "contact/create",
  "skill/[id]",
  "skill/create",
  "experience/[id]",
  "experience/create",
  "work/[id]",
  "work/create",
];

export default function AppLayout() {
  const { colors, radius, spacing, typography, design } = useTheme();
  const { t } = useTranslation();

  return (
    <Drawer
      screenOptions={({ navigation }) => ({
        headerShown: true,
        header() {
          return <Header navigation={navigation} />;
        },
        sceneContainerStyle: { backgroundColor: colors.background },
        drawerStyle: {
          backgroundColor: colors.drawerBackground,
          width: 288,
          borderRightWidth: design.chrome.borderWeight,
          borderRightColor: colors.cardBorder,
        },
        drawerActiveBackgroundColor: colors.primaryLight,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
        drawerItemStyle: {
          borderRadius: radius.lg,
          marginHorizontal: spacing.sm,
          marginVertical: 4,
          paddingHorizontal: spacing.xs,
        },
        drawerLabelStyle: {
          fontFamily: typography.body,
          fontSize: 14,
          marginLeft: -12,
        },
      })}
    >
      {/* ── Main screens ── */}
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: t("cms.dashboard"),
          drawerIcon: ({ color, size }) => (
            <MCIcons name="view-dashboard-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          drawerLabel: t("cms.about.title"),
          drawerIcon: ({ color, size }) => (
            <MCIcons name="account-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="tag"
        options={{
          drawerLabel: t("cms.tag.title"),
          drawerIcon: ({ color, size }) => (
            <MCIcons name="tag-multiple-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="skill"
        options={{
          drawerLabel: t("cms.skill.title"),
          drawerIcon: ({ color, size }) => (
            <MCIcons name="lightning-bolt-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="experience"
        options={{
          drawerLabel: t("cms.experience.title"),
          drawerIcon: ({ color, size }) => (
            <MCIcons name="briefcase-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="work"
        options={{
          drawerLabel: t("cms.work.title"),
          drawerIcon: ({ color, size }) => (
            <MCIcons name="laptop" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="contact"
        options={{
          drawerLabel: t("cms.contact.title"),
          drawerIcon: ({ color, size }) => (
            <MCIcons
              name="card-account-details-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: t("cms.settings"),
          drawerIcon: ({ color, size }) => (
            <MCIcons name="cog-outline" size={size} color={color} />
          ),
        }}
      />

      {/* ── Hidden sub-routes ── */}
      {HIDDEN_ROUTES.map((name) => (
        <Drawer.Screen
          key={name}
          name={name}
          options={{ drawerItemStyle: { display: "none" } }}
        />
      ))}
    </Drawer>
  );
}
