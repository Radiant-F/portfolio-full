import { useGetAboutQuery } from "@/features/about";
import { StyleSheet, Text, View } from "react-native";

export default function About() {
  // const { data } = useGetAboutQuery(null);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, color: "rgb(224, 242, 255)" }}>Meow</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
