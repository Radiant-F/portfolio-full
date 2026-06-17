import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ButtonCustom from "./ButtonCustom";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ErrorIndicator({
  onPressRefresh,
}: {
  onPressRefresh: () => void;
}) {
  return (
    <View style={{ gap: 10, alignItems: "center" }}>
      <Text style={{ color: "rgb(172, 193, 210)" }}>
        Failed to fetch data! {"o(><；)oo"}
      </Text>
      <ButtonCustom style={styles.btnSecondary} onPress={onPressRefresh}>
        <MaterialCommunityIcons
          color={"rgb(224, 242, 255)"}
          size={25}
          name="refresh"
        />
        <Text selectable={false} style={styles.textBtnSecondary}>
          Retry
        </Text>
      </ButtonCustom>
    </View>
  );
}

const styles = StyleSheet.create({
  textBtnSecondary: {
    color: "rgb(224, 242, 255)",
    fontWeight: "600",
    paddingRight: 5,
  },
  btnSecondary: {
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
});
