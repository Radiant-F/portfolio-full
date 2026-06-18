import { ButtonCustom } from "@/components";
import { Text, View, StyleSheet, useWindowDimensions } from "react-native";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  ButtonSocial,
  HeroDescription,
  Wave,
  WorkPreview,
} from "@/features/home";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { usePublicTheme } from "@/hooks";

export default function Index() {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const theme = usePublicTheme();
  const isWide = width >= 900;

  return (
    <View style={{ flex: 1 }}>
      <Wave />

      <View
        style={{
          ...styles.containerHero,
          flexDirection: isWide ? "row" : "column",
        }}
      >
        <View style={styles.viewHero}>
          {/* Hero Section */}
          <View style={styles.viewHeroText}>
            <Text style={{ ...styles.textHero, color: theme.text }}>
              {t("home.hero.greeting")}
              {"\n"}
              {t("home.hero.intro")}{" "}
              <Text style={{ color: theme.accentContrastText }}>Radiant</Text>.
            </Text>

            {/* Hero Description component (incase your derpy eyes missed it) */}
            <View style={{ height: 40 }}>
              <HeroDescription />
            </View>

            <View style={{ gap: 10 }}>
              <ButtonCustom
                style={{ ...styles.btnPrimary, backgroundColor: theme.accent }}
                containerStyle={{ alignSelf: "flex-start" }}
                onPress={() => router.navigate("/(public)/work")}
              >
                <MCIcons
                  color={theme.accentForeground}
                  size={25}
                  name="shape-outline"
                />
                <Text
                  selectable={false}
                  style={{
                    ...styles.textBtnPrimary,
                    color: theme.accentForeground,
                  }}
                >
                  {t("home.hero.actions.work")}
                </Text>
              </ButtonCustom>
              <ButtonCustom
                style={{
                  ...styles.btnSecondary,
                  backgroundColor: theme.buttonSecondaryBackground,
                }}
                containerStyle={{ alignSelf: "flex-start" }}
                onPress={() => router.navigate("/(public)/contact")}
              >
                <MCIcons
                  color={theme.buttonSecondaryText}
                  size={25}
                  name="message-text-fast"
                />
                <Text
                  selectable={false}
                  style={{
                    ...styles.textBtnSecondary,
                    color: theme.buttonSecondaryText,
                  }}
                >
                  {t("home.hero.actions.contact")}
                </Text>
              </ButtonCustom>
            </View>
          </View>

          {/* THE social button */}
          <ButtonSocial />
        </View>

        {/* Work screenshot preview */}
        <WorkPreview />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewHeroText: {
    gap: 15,
    flex: 1,
    justifyContent: "center",
    maxWidth: 450,
    // backgroundColor: "aqua",
    paddingHorizontal: 25,
  },

  viewHero: {
    // backgroundColor: "dodgerblue",
    height: "100%",
    justifyContent: "space-evenly",
  },

  containerHero: {
    alignItems: "center",
    justifyContent: "space-evenly",
    // backgroundColor: "aqua",
    flex: 1,
  },
  textBtnSecondary: {
    fontWeight: "600",
  },
  btnSecondary: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 25,
    borderRadius: 50 / 2,
    elevation: 3,
    gap: 10,
  },
  textBtnPrimary: {
    fontWeight: "600",
  },
  btnPrimary: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 25,
    borderRadius: 50 / 2,
    elevation: 3,
    gap: 10,
  },
  textHero: {
    fontWeight: "600",
    fontSize: 55,
    // backgroundColor: "dodgerblue",
  },
});
