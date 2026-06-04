import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import Button from "../Button";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import Flags from "../Flags";
import type { LocaleType } from "@/constants/language";

type ButtonLangProps = {
  label: string;
  locale: LocaleType;
  onPress: () => void;
  selected: boolean;
};

export default function ButtonLanguage({
  locale,
  label,
  onPress,
  selected,
}: ButtonLangProps) {
  const selectProgress = useSharedValue(selected ? 1 : 0);

  useEffect(() => {
    selectProgress.value = withTiming(selected ? 1 : 0, { duration: 180 });
  }, [selected, selectProgress]);

  const containerStyle = useAnimatedStyle(() => {
    const emphasis = Math.max(selectProgress.value);

    return {
      backgroundColor: interpolateColor(
        emphasis,
        [0, 1],
        ["rgba(104, 188, 248, 0)", "rgba(104, 188, 248, 0.15)"],
      ),
    };
  });

  const labelStyle = useAnimatedStyle(() => {
    const emphasis = Math.max(selectProgress.value);

    return {
      color: interpolateColor(
        emphasis,
        [0, 1],
        ["rgb(172, 193, 210)", "rgb(158, 213, 255)"],
      ),
    };
  });

  return (
    <Button onPress={onPress}>
      <Animated.View style={[styles.container, containerStyle]}>
        <Flags locale={locale} />
        <Animated.Text
          selectable={false}
          style={[{ marginHorizontal: 10 }, labelStyle]}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 50 / 2,
  },
});
