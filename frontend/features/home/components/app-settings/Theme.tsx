import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ButtonCustom } from "@/components";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import ColorPicker, { HueSlider, Panel1 } from "reanimated-color-picker";

type ThemeMode = "dark" | "auto" | "light";

export default function Theme() {
  const [selectedMode, setSelectedMode] = useState<ThemeMode>("dark");
  const backgroundColor = (mode: ThemeMode) =>
    selectedMode == mode ? "rgba(104, 188, 248, 0.15)" : undefined;
  const textColor = (mode: ThemeMode) =>
    selectedMode == mode ? "rgb(158, 213, 255)" : "rgb(172, 193, 210)";

  const onSelectColor = ({ hex }: { hex: string }) => {
    "worklet";
    // do something with the selected color.
    console.log(hex);
  };

  return (
    <View>
      <Text style={{ color: "rgb(172, 193, 210)" }}>Theme</Text>
      <View style={styles.viewMode}>
        <ButtonCustom
          style={{
            ...styles.btnMode,
            backgroundColor: backgroundColor("dark"),
          }}
          onPress={() => setSelectedMode("dark")}
        >
          <MCIcons name="weather-night" color={textColor("dark")} size={20} />
          <Text style={{ color: textColor("dark") }}>Dark</Text>
        </ButtonCustom>
        <ButtonCustom
          style={{
            ...styles.btnMode,
            backgroundColor: backgroundColor("auto"),
          }}
          onPress={() => setSelectedMode("auto")}
        >
          <MCIcons name="monitor" color={textColor("auto")} size={20} />
          <Text style={{ color: textColor("auto") }}>Auto</Text>
        </ButtonCustom>
        <ButtonCustom
          style={{
            ...styles.btnMode,
            backgroundColor: backgroundColor("light"),
          }}
          onPress={() => setSelectedMode("light")}
        >
          <MCIcons name="weather-sunny" color={textColor("light")} size={20} />
          <Text style={{ color: textColor("light") }}>Light</Text>
        </ButtonCustom>
      </View>
      <ColorPicker
        thumbSize={20}
        thumbShape="circle"
        value="aqua"
        onComplete={onSelectColor}
      >
        <Panel1 />
        <HueSlider />
      </ColorPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  viewMode: {
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "rgb(172, 193, 210)",
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 50 / 2,
    overflow: "hidden",
  },
  btnMode: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 15,
    paddingRight: 17.5,
    gap: 5,
    borderRadius: 50 / 2,
  },
});
