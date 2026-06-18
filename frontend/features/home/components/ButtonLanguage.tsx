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
import { usePublicTheme } from "@/hooks";

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
  const theme = usePublicTheme();
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
        ["rgba(0, 0, 0, 0)", theme.accentSoft],
      ),
    };
  });

  const labelStyle = useAnimatedStyle(() => {
    const emphasis = Math.max(selectProgress.value);

    return {
      color: interpolateColor(
        emphasis,
        [0, 1],
        [theme.textSecondary, theme.accentContrastText],
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
