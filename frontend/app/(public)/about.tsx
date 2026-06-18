import { StyleSheet, Text, View } from "react-native";
import { usePublicTheme } from "@/hooks";

export default function About() {
  // const { data } = useGetAboutQuery(null);
  const theme = usePublicTheme();

  return (
    <View style={styles.container}>
      <Text
        style={{ color: theme.text, textAlign: "center" }}
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
