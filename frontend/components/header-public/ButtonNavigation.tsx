import { useEffect } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolateColor,
  AnimatedStyle,
} from "react-native-reanimated";
import Button from "../Button";
import type { StyleProp, ViewStyle } from "react-native";

type ButtonNavProps = {
  label: string;
  focused: boolean;
  onPress: () => void;
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
};

export default function ButtonNavigation({
  focused,
  label,
  onPress,
  style,
}: ButtonNavProps) {
  const focusProgress = useSharedValue(focused ? 1 : 0);
  const hoverProgress = useSharedValue(0);

  useEffect(() => {
    focusProgress.value = withTiming(focused ? 1 : 0, { duration: 180 });
  }, [focused, focusProgress]);

  const containerStyle = useAnimatedStyle(() => {
    const emphasis = Math.max(focusProgress.value, hoverProgress.value * 0.6);

    return {
      backgroundColor: interpolateColor(
        emphasis,
        [0, 1],
        ["rgba(104, 188, 248, 0)", "rgba(104, 188, 248, 0.15)"],
      ),
      borderColor: interpolateColor(
        emphasis,
        [0, 1],
        ["rgba(104, 188, 248, 0)", "rgba(104, 188, 248, 0.28)"],
      ),
    };
  });

  const textStyle = useAnimatedStyle(() => {
    const emphasis = Math.max(focusProgress.value, hoverProgress.value * 0.6);

    return {
      color: interpolateColor(
        emphasis,
        [0, 1],
        ["rgb(172, 193, 210)", "rgb(158, 213, 255)"],
      ),
    };
  });

  return (
    <Button
      onPress={onPress}
      onHoverIn={() => {
        hoverProgress.value = withTiming(1, { duration: 160 });
      }}
      onHoverOut={() => {
        hoverProgress.value = withTiming(0, { duration: 160 });
      }}
    >
      <Animated.View
        pointerEvents={"none"}
        style={[
          {
            padding: 9,
            paddingHorizontal: 14,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "rgba(104, 188, 248, 0)",
          },
          style,
          containerStyle,
        ]}
      >
        <Animated.Text selectable={false} style={textStyle}>
          {label}
        </Animated.Text>
      </Animated.View>
    </Button>
  );
}
