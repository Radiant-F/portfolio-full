import { DrawerHeaderProps } from "@react-navigation/drawer";
import { Image, StyleSheet, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { usePathname } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { ButtonCustom } from "@/components";
import LanguagePicker from "./LanguagePicker";
import ButtonNavigation from "./ButtonNavigation";
import AppSettings from "./app-settings/AppSettings";
import { usePublicTheme } from "@/hooks";

export default function HeaderHome(props: DrawerHeaderProps) {
  const { top } = useSafeAreaInsets();
  const theme = usePublicTheme();
  const { t } = useTranslation();

  const pathname = usePathname();
  const activeRouteName = pathname.split("/").filter(Boolean)[0] ?? "index";
  const routes = ["index", "work", "skill", "experience", "contact", "about"];

  const { width } = useWindowDimensions();
  const BREAKPOINT = 768;
  const isWide = width >= BREAKPOINT;

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: top + 10,
        backgroundColor: theme.headerBackground,
      }}
    >
      {!isWide && (
        <ButtonCustom
          style={styles.btnDrawer}
          onPress={() => props.navigation.toggleDrawer()}
        >
          <MCIcons name="menu-open" color={theme.textSecondary} size={25} />
        </ButtonCustom>
      )}

      <Image
        source={require("@/assets/images/qing.png")}
        resizeMethod="resize"
        resizeMode="cover"
        style={{ ...styles.qing, marginHorizontal: isWide ? 20 : 0 }}
      />

      {isWide && (
        <View style={{ flexDirection: "row", gap: 10 }}>
          {routes.map((route) => (
            <ButtonNavigation
              key={route}
              label={t(`home.nav.${route}`)}
              focused={route === activeRouteName}
              onPress={() =>
                props.navigation.dispatch(DrawerActions.jumpTo(route))
              }
            />
          ))}
        </View>
      )}

      <View style={{ flex: 1 }} />

      <LanguagePicker />

      <AppSettings />
    </View>
  );
}

const styles = StyleSheet.create({
  btnOpenModal: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 50,
    paddingHorizontal: 20,
  },
  qing: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  btnDrawer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    elevation: 3,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
});
