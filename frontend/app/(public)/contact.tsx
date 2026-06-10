import { ButtonCustom } from "@/components";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type MCIconsType = keyof typeof MCIcons.glyphMap;

const CONTACT_EXAMPLE: {
  title: string;
  platform: MCIconsType;
  url: string;
}[] = [
  {
    title: "Email",
    platform: "ab-testing",
    url: "mailto:radiantfadilah0@gmail.com",
  },
  {
    title: "Telegram",
    platform: "ab-testing",
    url: "https://t.me/exkoi#",
  },
  {
    title: "WhatsApp",
    platform: "ab-testing",
    url: "https://wa.me/6285157439660",
  },
  {
    title: "GitHub",
    platform: "ab-testing",
    url: "https://github.com/Radiant-F",
  },
  {
    title: "Discord",
    platform: "ab-testing",
    url: "mailto:radiantfadilah0@gmail.com",
  },
];

export default function Contact() {
  const { bottom: bottomInset } = useSafeAreaInsets();

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          ...styles.container,
          paddingBottom: bottomInset + 20,
          paddingTop: 20,
        }}
      >
        <Text style={styles.textTitle}>
          Get in <Text style={{ color: "rgb(158, 213, 255)" }}>touch</Text>
        </Text>

        <View style={{ gap: 20, padding: 20 }}>
          {CONTACT_EXAMPLE.map((v, i) => (
            <View key={i} style={styles.item}>
              <MCIcons
                name={v.platform}
                size={30}
                color={"rgb(224, 242, 255)"}
              />
              <Text style={styles.textItem}>{v.title}</Text>
              <ButtonCustom style={styles.btnVisit}>
                <MCIcons color={"rgb(224, 242, 255)"} size={25} name="send" />
                <Text selectable={false} style={styles.textVisit}>
                  Visit
                </Text>
              </ButtonCustom>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  textItem: {
    color: "rgb(224, 242, 255)",
    fontWeight: "600",
    fontSize: 20,
  },
  textVisit: {
    color: "rgb(224, 242, 255)",
    fontWeight: "600",
  },
  btnVisit: {
    backgroundColor: "rgb(39, 48, 58)",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 25,
    borderRadius: 50 / 2,
    elevation: 3,
    gap: 10,
  },
  item: {
    backgroundColor: "rgb(30, 31, 36)",
    elevation: 5,
    borderRadius: 20,
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },
  textTitle: {
    fontWeight: "bold",
    color: "rgb(224, 242, 255)",
    textAlign: "center",
    fontSize: 27,
  },
  container: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
  },
});
