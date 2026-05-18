import { Text, View } from "react-native";
import { Link, router } from "expo-router";
import { Button } from "@/components";
import { useAppSelector } from "@/hooks";

export default function Index() {
  const accessToken = useAppSelector(
    (state) => state.auth.credentials.accessToken,
  );
  const isLoggedIn = !!accessToken;

  return (
    <View>
      <Text
        style={{ textAlign: "center" }}
      >{`💜\n✨ Melom is a cutie :3 ✨\n💜`}</Text>
      <Text>{process.env.EXPO_PUBLIC_API_URL}</Text>
      <Button
        title={isLoggedIn ? "To CMS" : "To Sign In"}
        onPress={() => router.push(isLoggedIn ? "/(app)" : "/sign-in")}
      />
    </View>
  );
}
