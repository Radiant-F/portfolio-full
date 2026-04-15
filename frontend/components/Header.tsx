import {
  Button,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  navigation?: DrawerNavigationProp<any>;
};

const BREAKPOINT = 768;

const routes = ["about", "contact", "experience", "skill", "work"];

export default function Header({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isNarrow = width < BREAKPOINT;

  if (!navigation) return null;

  return (
    <View style={{ paddingTop: insets.top + 10 }}>
      <Text>Portfolio</Text>
      {isNarrow ? (
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <MCIcons name="menu" size={24} color={"black"} />
        </Pressable>
      ) : (
        <View style={{ flexDirection: "row" }}>
          {routes.map((route) => (
            <Button
              title={route}
              key={route}
              onPress={() => navigation.dispatch(DrawerActions.jumpTo(route))}
            />
          ))}
        </View>
      )}
    </View>
  );
}
