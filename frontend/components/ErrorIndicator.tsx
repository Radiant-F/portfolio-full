import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ButtonCustom from "./ButtonCustom";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePublicTheme } from "@/hooks";

export default function ErrorIndicator({
  onPressRefresh,
}: {
  onPressRefresh: () => void;
}) {
  const theme = usePublicTheme();

  return (
    <View style={{ gap: 10, alignItems: "center" }}>
      <Text style={{ color: theme.textSecondary }}>
        Failed to fetch data! {"o(><；)oo"}
      </Text>
      <ButtonCustom
        style={{
          ...styles.btnSecondary,
          backgroundColor: theme.buttonSecondaryBackground,
        }}
        onPress={onPressRefresh}
      >
        <MaterialCommunityIcons
          color={theme.buttonSecondaryText}
          size={25}
          name="refresh"
        />
        <Text
          selectable={false}
          style={{
            ...styles.textBtnSecondary,
            color: theme.buttonSecondaryText,
          }}
        >
          Retry
        </Text>
      </ButtonCustom>
    </View>
  );
}

const styles = StyleSheet.create({
  textBtnSecondary: {
    fontWeight: "600",
    paddingRight: 5,
  },
  btnSecondary: {
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
