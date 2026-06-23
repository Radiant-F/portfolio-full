import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { usePublicTheme } from "@/hooks";

type InputFormType = {
  title: string;
  onChangeText: (text: string) => void;
  value: string;
} & Pick<
  TextInputProps,
  | "autoComplete"
  | "blurOnSubmit"
  | "keyboardType"
  | "returnKeyType"
  | "secureTextEntry"
  | "textContentType"
  | "onSubmitEditing"
>;

export default function InputForm({
  onChangeText,
  title = "Input Title",
  value,
  ...inputProps
}: InputFormType) {
  const [focused, setFocused] = useState(false);
  const theme = usePublicTheme();

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
      [theme.border, theme.accentContrastText],
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
      [theme.textSecondary, theme.accentContrastText],
    ),
  }));

  const labelContainerStyle = useAnimatedStyle(() => {
    const borderState = floatProgress.value + focusProgress.value;

    return {
      borderColor: interpolateColor(
        borderState,
        [0, 1, 2],
        ["transparent", theme.border, theme.accentContrastText],
      ),
    };
  });

  return (
    <Animated.View
      style={[
        styles.viewForm,
        fieldStyle,
        { backgroundColor: theme.surfaceTint, borderColor: theme.border },
      ]}
    >
      <Animated.View
        pointerEvents={"none"}
        style={[
          styles.inputLabel,
          labelStyle,
          labelContainerStyle,
          { backgroundColor: theme.surfaceTint },
        ]}
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
        style={[styles.input, { color: theme.text }]}
        placeholderTextColor={theme.textSecondary}
        {...inputProps}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    paddingHorizontal: 20,
    outlineStyle: "none" as any,
  },
  inputLabel: {
    position: "absolute",
    paddingHorizontal: 10,
    borderRadius: 11,
    borderWidth: 1,
    paddingBottom: 1,
    left: 10,
  },
  viewForm: {
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: "center",
  },
});
