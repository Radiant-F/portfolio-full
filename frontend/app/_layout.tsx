import i18n from "@/locale/i18n";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect, useState } from "react";
import { setCredentials } from "@/features/auth";
import { restoreSettings } from "@/features/app-settings";
import type { ThemeMode } from "@/features/app-settings";
import { Text, View } from "react-native";
import { storage } from "@/api/storage";
import { useFonts } from "expo-font";
import { DEFAULT_DESIGN, type DesignVariant } from "@/constants/theme";

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

  useEffect(() => {
    if (!fontLoaded && !error) return;

    async function restoreSession() {
      try {
        const accessToken = storage.getString("token.access") ?? null;
        const refreshToken = storage.getString("token.refresh") ?? null;

        if (accessToken || refreshToken) {
          dispatch(setCredentials({ accessToken, refreshToken, user: null }));
        }

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
      } catch (restoreError) {
        console.log("ERROR READING SESSION:", restoreError);
      } finally {
        setIsReady(true);
      }
    }

    restoreSession();
  }, [dispatch, error, fontLoaded]);

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

// function RootNavigator() {
//   const dispatch = useAppDispatch();

//   const [isReady, setIsReady] = useState(false);

//   const accessToken = useAppSelector(
//     (state) => state.auth.credentials.accessToken,
//   );
//   const isLoggedIn = !!accessToken;

//   const [fontLoaded, error] = useFonts({
//     LexendRegular: require("@/assets/fonts/Lexend-Regular.ttf"),
//     LexendBold: require("@/assets/fonts/Lexend-Bold.ttf"),
//   });

//   async function restoreSession() {
//     try {
//       const accessToken = storage.getString("token.access") ?? null;
//       const refreshToken = storage.getString("token.refresh") ?? null;

//       if (accessToken || refreshToken) {
//         dispatch(setCredentials({ accessToken, refreshToken, user: null }));
//       }
//     } catch (error) {
//       console.log("ERROR READING SESSION:", error);
//     } finally {
//       setIsReady(true);
//     }
//   }

//   useEffect(() => {
//     if (fontLoaded || error) restoreSession();
//   }, [fontLoaded, error]);

//   if (!isReady) {
//     return (
//       <View>
//         <Text>Hang in there, champ...</Text>
//       </View>
//     );
//   }

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       {/* Public routes */}
//       <Stack.Screen name="(public)" />

//       {/* Only available when not logged in */}
//       <Stack.Protected guard={!isLoggedIn}>
//         <Stack.Screen name="sign-in" />
//       </Stack.Protected>

//       {/* Only available when logged in */}
//       <Stack.Protected guard={isLoggedIn}>
//         <Stack.Screen name="(app)" />
//       </Stack.Protected>
//     </Stack>
//   );
// }

// export default function RootLayout() {
//   return (
//     <Provider store={store}>
//       <RootNavigator />
//     </Provider>
//   );
// }
