import { useEffect, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const COLORS = {
  input: "rgb(37, 43, 49)",
  borderBlur: "rgb(55, 62, 78)",
  borderFocus: "rgb(175, 211, 244)",
  labelBlur: "rgb(172, 193, 210)",
  labelFocus: "rgb(158, 213, 255)",
  text: "rgb(230, 238, 245)",
};

type InputFormType = {
  title: string;
  onChangeText: (text: string) => void;
  value: string;
};

export default function InputForm({
  onChangeText,
  title = "Input Title",
  value,
}: InputFormType) {
  const [focused, setFocused] = useState(false);

  const floatProgress = useSharedValue(0);
  const focusProgress = useSharedValue(0);

  useEffect(() => {
    floatProgress.value = withTiming(focused || value.length > 0 ? 1 : 0, {
      duration: 180,
      easing: Easing.out(Easing.cubic),
    });
  }, [focused, value, floatProgress]);

  useEffect(() => {
    focusProgress.value = withTiming(focused ? 1 : 0, {
      duration: 180,
      easing: Easing.out(Easing.cubic),
    });
  }, [focused, focusProgress]);

  const fieldStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      focusProgress.value,
      [0, 1],
      [COLORS.borderBlur, COLORS.borderFocus],
    ),
  }));

  const labelStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(floatProgress.value, [0, 1], [0, -25]) },
      { scale: interpolate(floatProgress.value, [0, 1], [1, 0.8]) },
    ],
  }));

  const textLabelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      focusProgress.value,
      [0, 1],
      [COLORS.labelBlur, COLORS.labelFocus],
    ),
  }));

  const labelContainerStyle = useAnimatedStyle(() => {
    const borderState = floatProgress.value + focusProgress.value;

    return {
      borderColor: interpolateColor(
        borderState,
        [0, 1, 2],
        ["transparent", COLORS.borderBlur, COLORS.borderFocus],
      ),
    };
  });

  return (
    <Animated.View style={[styles.viewForm, fieldStyle]}>
      <Animated.View
        pointerEvents={"none"}
        style={[styles.inputLabel, labelStyle, labelContainerStyle]}
      >
        <Animated.Text selectable={false} style={textLabelStyle}>
          {title}
        </Animated.Text>
      </Animated.View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder=""
        style={[styles.input]}
        placeholderTextColor={COLORS.labelBlur}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    color: COLORS.text,
    paddingHorizontal: 20,
    outlineStyle: "none" as any,
  },
  inputLabel: {
    position: "absolute",
    backgroundColor: COLORS.input,
    paddingHorizontal: 10,
    borderRadius: 11,
    borderWidth: 1,
    paddingBottom: 1,
    left: 10,
  },
  viewForm: {
    backgroundColor: COLORS.input,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: "center",
  },
});
