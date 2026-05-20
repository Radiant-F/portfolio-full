import { Drawer } from "expo-router/drawer";
import { DrawerContentPublic, HeaderPublic } from "@/components";

export default function PublicLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        header: (props) => <HeaderPublic {...props} />,
        sceneStyle: { backgroundColor: "rgb(26, 25, 31)" },
        drawerStyle: { backgroundColor: "rgb(31, 31, 38)" },
      }}
      drawerContent={(props) => <DrawerContentPublic {...props} />}
    >
      <Drawer.Screen name="index" options={{ drawerLabel: "Home" }} />
      <Drawer.Screen name="skill" options={{ drawerLabel: "Skill" }} />
      <Drawer.Screen name="work" options={{ drawerLabel: "Work" }} />
      <Drawer.Screen
        name="experience"
        options={{ drawerLabel: "Experience" }}
      />
      <Drawer.Screen name="contact" options={{ drawerLabel: "Contact" }} />
      <Drawer.Screen name="about" options={{ drawerLabel: "About" }} />
    </Drawer>
  );
}
