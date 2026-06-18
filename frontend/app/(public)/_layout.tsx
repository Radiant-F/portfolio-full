import { Drawer } from "expo-router/drawer";
import { DrawerContentHome, HeaderHome } from "@/features/home";
import { useEffect } from "react";
import { storage } from "@/api/storage";
import { useAppDispatch, usePublicTheme } from "@/hooks";
import {
  PUBLIC_THEME_STORAGE_KEYS,
  restorePublicTheme,
  type PublicThemeMode,
} from "@/features/home/services/publicThemeSlice";

export default function PublicLayout() {
  const dispatch = useAppDispatch();
  const theme = usePublicTheme();

  useEffect(() => {
    const storedMode = storage.getString(PUBLIC_THEME_STORAGE_KEYS.mode) as
      | PublicThemeMode
      | undefined;
    const storedAccent = storage.getString(PUBLIC_THEME_STORAGE_KEYS.accent);

    dispatch(
      restorePublicTheme({
        mode: storedMode ?? "dark",
        accentColor: storedAccent ? storedAccent : null,
      }),
    );
  }, [dispatch]);

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        header: (props) => <HeaderHome {...props} />,
        sceneStyle: { backgroundColor: theme.background },
        drawerStyle: { backgroundColor: theme.drawerBackground },
      }}
      drawerContent={(props) => <DrawerContentHome {...props} />}
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
