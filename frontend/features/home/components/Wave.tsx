import { usePublicTheme } from "@/hooks";
import { useEffect, memo } from "react";
import { useWindowDimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const svgStyle = { position: "absolute", bottom: 0 } as const;

const FluidAnimation = memo(() => {
  const theme = usePublicTheme();
  const { width } = useWindowDimensions();

  const waveOffset = useSharedValue(0);

  useEffect(() => {
    waveOffset.value = withRepeat(
      withTiming(200, { duration: 10000 }),
      -1,
      true,
    );
  }, [waveOffset]);

  const animatedProps = useAnimatedProps(() => {
    const offset = interpolate(waveOffset.value, [0, 100], [-20, 20]);

    const path = `
      M 0 50
      Q ${width / 4} ${30 + offset}, ${width / 2} 50
      Q ${(width * 3) / 4} ${70 - offset}, ${width} 50
      V 200
      H 0
      Z
    `;

    return { d: path };
  }, [width]);

  return (
    <Svg
      width={`${width}`}
      height="200"
      viewBox={`0 0 ${width} 200`}
      style={svgStyle}
    >
      <AnimatedPath fill={theme.wave} animatedProps={animatedProps} />
    </Svg>
  );
});

FluidAnimation.displayName = "FluidAnimation";

export default FluidAnimation;
