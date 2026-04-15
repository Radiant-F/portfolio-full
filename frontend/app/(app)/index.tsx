import { Text, View } from "react-native";
import { Button } from "@/components";
import { useSignOutMutation, useMeQuery } from "@/features/auth";
import { router } from "expo-router";

export default function Dashboard() {
  const { data } = useMeQuery(null);
  const [logout, { isLoading }] = useSignOutMutation();
  return (
    <View>
      <Text>CMS Dashboard</Text>
      <Text>Hello, {data ? data.email : ""}</Text>
      <Text>ID: {data ? data.id : ""}</Text>
      <Button
        title="To Home (public)"
        onPress={() => router.navigate("/(public)")}
      />
      <Button
        title={`${isLoading ? "Logging out..." : "Log out"}`}
        onPress={() => logout(null)}
      />
    </View>
  );
}
