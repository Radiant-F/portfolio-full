import { useGetAboutQuery } from "@/features/about";
import { StyleSheet, Text, View } from "react-native";

export default function About() {
  const { data } = useGetAboutQuery(null);
  return (
    <View>
      <Text>About: {data ? data.content : "Loading..."}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
