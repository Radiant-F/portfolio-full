import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { usePathname } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerActions } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import ButtonNavigation from "./ButtonNavigation";

export default function DrawerContentHome(props: DrawerContentComponentProps) {
  const { top } = useSafeAreaInsets();
  const { t } = useTranslation();

  const pathname = usePathname();
  const activeRouteName = pathname.split("/").filter(Boolean)[0] ?? "index";
  const routes = ["index", "work", "skill", "experience", "contact", "about"];

  return (
    <View style={{ paddingTop: 20 + top, gap: 15, padding: 20 }}>
      {routes.map((route) => {
        return (
          <ButtonNavigation
            style={{
              height: 49,
              borderRadius: 49 / 2,
              padding: 0,
              justifyContent: "center",
            }}
            key={route}
            label={t(`home.nav.${route}`)}
            focused={route === activeRouteName}
            onPress={() =>
              props.navigation.dispatch(DrawerActions.jumpTo(route))
            }
          />
        );
      })}
    </View>
  );
}
