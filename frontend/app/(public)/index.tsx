import { Text, View } from "react-native";
import { router } from "expo-router";
import { Button } from "@/components";
import { useAppSelector } from "@/hooks";

export default function Index() {
  const isLoggedIn = useAppSelector(
    (state) => state.auth.sessionStatus === "authenticated",
  );

  return (
    <View>
      <Text
        style={{ textAlign: "center" }}
      >{`💜\n✨ Who will be the next cutie.. ✨\n💜`}</Text>
      <Text>{process.env.EXPO_PUBLIC_API_URL}</Text>
      <Button
        title={isLoggedIn ? "To CMS" : "To Sign In"}
        onPress={() => router.push(isLoggedIn ? "/(app)" : "/sign-in")}
      />
    </View>
  );
}
