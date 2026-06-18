import { ButtonCustom } from "@/components";
import { PressableProps, StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { usePublicTheme } from "@/hooks";

export function getWrappedPaginationProgress(
  value: number,
  slideCount: number,
) {
  "worklet";

  if (slideCount <= 1) {
    return 0;
  }

  const lastIndex = slideCount - 1;

  if (value <= lastIndex) {
    return value;
  }

  return interpolate(
    value,
    [lastIndex, slideCount],
    [lastIndex, 0],
    Extrapolation.CLAMP,
  );
}

type WorkPreviewButtonProps = {
  index: number;
  progress: SharedValue<number>;
  slideCount: number;
  onPress: (index: number) => void;
  onHoverIn: NonNullable<PressableProps["onHoverIn"]>;
  onHoverOut: NonNullable<PressableProps["onHoverOut"]>;
};

export default function WorkPreviewButton({
  index,
  progress,
  slideCount,
  onPress,
  onHoverIn,
  onHoverOut,
}: WorkPreviewButtonProps) {
  const theme = usePublicTheme();

  const textStyle = useAnimatedStyle(() => {
    const wrappedProgress = getWrappedPaginationProgress(
      progress.value,
      slideCount,
    );
    const distance = Math.abs(wrappedProgress - index);

    return {
      color: interpolateColor(
        distance,
        [0, 1],
        [theme.accentForeground, theme.buttonSecondaryText],
      ),
      transform: [
        {
          scale: interpolate(distance, [0, 1], [1.06, 1], Extrapolation.CLAMP),
        },
      ],
    };
  });

  return (
    <ButtonCustom
      containerStyle={styles.buttonContainer}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
      onPress={() => onPress(index)}
      style={styles.button}
    >
      <Animated.Text selectable={false} style={[styles.indexText, textStyle]}>
        {index + 1}
      </Animated.Text>
    </ButtonCustom>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    backgroundColor: "transparent",
  },
  indexText: {
    fontWeight: "600",
  },
});
