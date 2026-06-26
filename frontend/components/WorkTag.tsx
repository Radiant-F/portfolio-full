import { StyleSheet, View, Text } from "react-native";
import type { ComponentProps } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { WorkTagName } from "@/constants/twork-tag";

type WorkTagProps = {
  name: WorkTagName;
  showName?: boolean;
};

const TAG_CONFIG: Record<
  WorkTagName,
  {
    icon: ComponentProps<typeof Icon>["name"];
    backgroundColor: string;
    borderColor: string;
    textColor: string;
  }
> = {
  Android: {
    icon: "android",
    backgroundColor: "rgb(37, 102, 41)",
    borderColor: "rgb(67, 160, 71)",
    textColor: "rgb(200, 230, 201)",
  },
  iOS: {
    icon: "apple-ios",
    backgroundColor: "rgb(21, 101, 192)",
    borderColor: "rgb(66, 165, 245)",
    textColor: "rgb(187, 222, 251)",
  },
  Web: {
    icon: "web",
    backgroundColor: "rgb(106, 27, 154)",
    borderColor: "rgb(186, 104, 200)",
    textColor: "rgb(225, 190, 231)",
  },
  WordPress: {
    icon: "wordpress",
    backgroundColor: "rgb(33, 103, 178)",
    borderColor: "rgb(85, 136, 214)",
    textColor: "rgb(224, 236, 255)",
  },
  "Open Source": {
    icon: "github",
    backgroundColor: "rgb(36, 41, 46)",
    borderColor: "rgb(81, 90, 98)",
    textColor: "rgb(204, 214, 221)",
  },
  React: {
    icon: "react",
    backgroundColor: "rgb(97, 218, 251)",
    borderColor: "rgb(1, 135, 212)",
    textColor: "rgb(15, 76, 129)",
  },
  "React Native": {
    icon: "react",
    backgroundColor: "rgb(28, 136, 160)",
    borderColor: "rgb(98, 239, 255)",
    textColor: "rgb(224, 247, 250)",
  },
  Expo: {
    icon: "react",
    backgroundColor: "rgb(28, 136, 160)",
    borderColor: "rgb(98, 239, 255)",
    textColor: "rgb(224, 247, 250)",
  },
  "Play Store": {
    icon: "google-play",
    backgroundColor: "rgb(35, 122, 62)",
    borderColor: "rgb(66, 215, 125)",
    textColor: "rgb(200, 230, 201)",
  },
  Firebase: {
    icon: "firebase",
    backgroundColor: "rgb(229, 169, 26)",
    borderColor: "rgb(255, 201, 71)",
    textColor: "rgb(255, 248, 225)",
  },
  Laravel: {
    icon: "laravel",
    backgroundColor: "rgb(176, 46, 46)",
    borderColor: "rgb(255, 79, 79)",
    textColor: "rgb(250, 212, 212)",
  },
  MongoDB: {
    icon: "leaf",
    backgroundColor: "rgb(17, 75, 45)",
    borderColor: "rgb(38, 165, 106)",
    textColor: "rgb(200, 230, 201)",
  },
  Private: {
    icon: "lock",
    backgroundColor: "rgb(38, 38, 40)",
    borderColor: "rgb(97, 97, 100)",
    textColor: "rgb(224, 224, 224)",
  },
  Personal: {
    icon: "account",
    backgroundColor: "rgb(93, 64, 55)",
    borderColor: "rgb(141, 110, 99)",
    textColor: "rgb(239, 235, 233)",
  },
  Team: {
    icon: "account-group",
    backgroundColor: "rgb(49, 27, 146)",
    borderColor: "rgb(124, 77, 255)",
    textColor: "rgb(237, 231, 246)",
  },
};

export function WorkTag({ name, showName = true }: WorkTagProps) {
  const tag = TAG_CONFIG[name];

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: tag.backgroundColor,
        borderColor: tag.borderColor,
      }}
    >
      <Icon name={tag.icon} size={20} color={tag.borderColor} />
      {showName && (
        <Text style={{ marginHorizontal: 5, color: tag.textColor }}>
          {name}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: "row",
    height: 30,
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 30 / 2,
  },
});
