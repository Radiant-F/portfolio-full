import { Drawer } from "expo-router/drawer";
import { Header } from "@/components";

export default function PublicLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        header: (props) => {
          return <Header navigation={props.navigation} />;
        },
      }}
    />
  );
}
