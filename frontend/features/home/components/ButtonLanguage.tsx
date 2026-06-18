import { StyleSheet } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import type { LocaleType } from "@/constants/language";
import { ButtonCustom, Flags } from "@/components";

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
    <ButtonCustom onPress={onPress}>
      <Animated.View style={[styles.container, containerStyle]}>
        <Flags locale={locale} />
        <Animated.Text selectable={false} style={[{}, labelStyle]}>
          {label}
        </Animated.Text>
      </Animated.View>
    </ButtonCustom>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 50 / 2,
    gap: 10,
  },
});
