import i18n from "@/locale/i18n";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect, useState } from "react";
import {
  clearCredentials,
  setSessionStatus,
  useRefreshTokenMutation,
} from "@/features/auth";
import { restoreSettings } from "@/features/app-settings";
import type { ThemeMode } from "@/features/app-settings";
import { Text, View } from "react-native";
import { storage } from "@/api/storage";
import { useFonts } from "expo-font";
import { DEFAULT_DESIGN, type DesignVariant } from "@/constants/theme";
import {
  clearStoredSession,
  hasRestorableSession,
} from "@/features/auth/services/session";

function RootNavigator() {
  const dispatch = useAppDispatch();
  const [refreshSession] = useRefreshTokenMutation();

  const [isReady, setIsReady] = useState(false);

  const sessionStatus = useAppSelector((state) => state.auth.sessionStatus);
  const isLoggedIn = sessionStatus === "authenticated";

  const [fontLoaded, error] = useFonts({
    LexendRegular: require("@/assets/fonts/Lexend-Regular.ttf"),
    LexendBold: require("@/assets/fonts/Lexend-Bold.ttf"),
  });

  useEffect(() => {
    if (!fontLoaded && !error) return;

    async function restoreSession() {
      try {
        const savedTheme = storage.getString("settings.theme") as
          | ThemeMode
          | undefined;
        const savedLanguage = storage.getString("settings.language");
        const savedDesign = storage.getString("settings.design") as
          | DesignVariant
          | undefined;

        dispatch(
          restoreSettings({
            theme: savedTheme ?? "system",
            language: savedLanguage ?? null,
            design: savedDesign ?? DEFAULT_DESIGN,
          }),
        );

        if (savedLanguage && savedLanguage !== i18n.language) {
          await i18n.changeLanguage(savedLanguage);
        }

        dispatch(setSessionStatus("checking"));

        if (hasRestorableSession()) {
          await refreshSession(null).unwrap();
        } else {
          clearStoredSession();
          dispatch(clearCredentials());
        }
      } catch (restoreError) {
        clearStoredSession();
        dispatch(clearCredentials());
      } finally {
        setIsReady(true);
      }
    }

    restoreSession();
  }, [dispatch, error, fontLoaded, refreshSession]);

  if (!isReady) {
    return (
      <View>
        <Text>Hang in there, champ...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Public routes */}
      <Stack.Screen name="(public)" />

      {/* Only available when not logged in */}
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="sign-in" />
      </Stack.Protected>

      {/* Only available when logged in */}
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
