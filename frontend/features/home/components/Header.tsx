import { DrawerHeaderProps } from "@react-navigation/drawer";
import { Image, StyleSheet, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { usePathname } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { ButtonCustom } from "@/components";
import LanguagePicker from "./LanguagePicker";
import ButtonNavigation from "./ButtonNavigation";
import AppSettings from "./app-settings/AppSettings";

export default function HeaderHome(props: DrawerHeaderProps) {
  const { top } = useSafeAreaInsets();

  const pathname = usePathname();
  const activeRouteName = pathname.split("/").filter(Boolean)[0] ?? "index";
  const routes = [
    { name: "index", label: "Home" },
    { name: "work", label: "Work" },
    { name: "skill", label: "Skill" },
    { name: "experience", label: "Experience" },
    { name: "contact", label: "Contact" },
    { name: "about", label: "About" },
  ];

  const { width } = useWindowDimensions();
  const BREAKPOINT = 768;
  const isWide = width >= BREAKPOINT;

  return (
    <View style={{ ...styles.container, paddingTop: top + 10 }}>
      {!isWide && (
        <ButtonCustom
          style={styles.btnDrawer}
          onPress={() => props.navigation.toggleDrawer()}
        >
          <MCIcons name="menu-open" color={"rgb(172, 193, 210)"} size={25} />
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
              key={route.name}
              label={route.label}
              focused={route.name === activeRouteName}
              onPress={() =>
                props.navigation.dispatch(DrawerActions.jumpTo(route.name))
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
    backgroundColor: "rgb(31, 31, 38)",
    elevation: 3,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
});
