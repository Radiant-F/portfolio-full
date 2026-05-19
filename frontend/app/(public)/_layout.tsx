import { Drawer } from "expo-router/drawer";
import { HeaderPublic } from "@/components";

export default function PublicLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        header: (props) => <HeaderPublic {...props} />,
        sceneStyle: { backgroundColor: "rgb(26, 25, 31)" },
      }}
    >
      <Drawer.Screen name="index" options={{ drawerLabel: "Home" }} />
      <Drawer.Screen name="work" options={{ drawerLabel: "Work" }} />
      <Drawer.Screen name="about" options={{ drawerLabel: "About" }} />
      <Drawer.Screen name="skill" options={{ drawerLabel: "Skill" }} />
      <Drawer.Screen name="contact" options={{ drawerLabel: "Contact" }} />
      <Drawer.Screen
        name="experience"
        options={{ drawerLabel: "Experience" }}
      />
    </Drawer>
  );
}
