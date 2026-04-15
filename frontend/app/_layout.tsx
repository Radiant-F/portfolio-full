import "@/locale/i18n";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect, useState } from "react";
import { setCredentials } from "@/features/auth";
import { Text, View } from "react-native";
import { storage } from "@/api/storage";
import { useFonts } from "expo-font";

function RootNavigator() {
  const dispatch = useAppDispatch();

  const [isReady, setIsReady] = useState(false);

  const accessToken = useAppSelector(
    (state) => state.auth.credentials.accessToken,
  );
  const isLoggedIn = !!accessToken;

  const [fontLoaded, error] = useFonts({
    LexendRegular: require("@/assets/fonts/Lexend-Regular.ttf"),
    LexendBold: require("@/assets/fonts/Lexend-Bold.ttf"),
  });

  async function restoreSession() {
    try {
      const accessToken = storage.getString("token.access") ?? null;
      const refreshToken = storage.getString("token.refresh") ?? null;

      if (accessToken || refreshToken) {
        dispatch(setCredentials({ accessToken, refreshToken, user: null }));
      }
    } catch (error) {
      console.log("ERROR READING SESSION:", error);
    } finally {
      setIsReady(true);
    }
  }

  useEffect(() => {
    if (fontLoaded || error) restoreSession();
  }, [fontLoaded, error]);

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
