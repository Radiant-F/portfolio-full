import { useGetAboutQuery } from "@/features/about";
import { StyleSheet, Text, View } from "react-native";

export default function About() {
  // const { data } = useGetAboutQuery(null);

  return (
    <View style={styles.container}>
      <Text
        style={{ color: "rgb(224, 242, 255)", textAlign: "center" }}
      >{`Work in progress 🏗️\nUnless if you already know about me :3`}</Text>
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
