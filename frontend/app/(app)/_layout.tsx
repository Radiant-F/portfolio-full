import { Drawer } from "expo-router/drawer";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { Button, Header } from "@/components";

export default function AppLayout() {
  return (
    <Drawer
      screenOptions={({ navigation }) => ({
        headerShown: true,
        header(props) {
          return <Header navigation={props.navigation} />;
        },
        headerLeft: () => (
          <Button
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "aqua",
            }}
          >
            <MCIcons name="menu" size={24} color={"black"} />
          </Button>
        ),
      })}
    />
  );
}
