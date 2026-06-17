import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { usePathname } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerActions } from "@react-navigation/native";
import ButtonNavigation from "./ButtonNavigation";

export default function DrawerContentHome(props: DrawerContentComponentProps) {
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
            key={route.name}
            label={route.label}
            focused={route.name === activeRouteName}
            onPress={() =>
              props.navigation.dispatch(DrawerActions.jumpTo(route.name))
            }
          />
        );
      })}
    </View>
  );
}
