import i18n from "@/locale/i18n";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useAppDispatch } from "@/hooks";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { storage } from "@/api/storage";
import { useFonts } from "expo-font";

function RootNavigator() {
  const dispatch = useAppDispatch();

  const [isReady, setIsReady] = useState(false);

  const [fontLoaded, error] = useFonts({
    LexendRegular: require("@/assets/fonts/Lexend-Regular.ttf"),
    LexendBold: require("@/assets/fonts/Lexend-Bold.ttf"),
  });

  useEffect(() => {
    if (!fontLoaded && !error) return;
    let isMounted = true;

    async function restoreSession() {
      try {
        const savedLanguage = storage.getString("settings.language");

        if (savedLanguage && savedLanguage !== i18n.language) {
          await i18n.changeLanguage(savedLanguage);
        }
      } catch (restoreError) {
      } finally {
        if (isMounted) {
          setIsReady(true);
        }
      }
    }

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, [dispatch, error, fontLoaded]);

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "rgb(26, 25, 31)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "rgb(172, 193, 210)", fontStyle: "italic" }}>
          Hang in there, champ...
        </Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Public routes */}
      <Stack.Screen name="(public)" />

      {/* CMS routes */}
      {/* back log */}
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
