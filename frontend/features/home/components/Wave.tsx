import { useEffect } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

export default function FluidAnimation() {
  const { width } = useWindowDimensions();
  const waveWidth = Math.max(Math.ceil(width), 1);
  const totalWaveWidth = waveWidth * 2;

  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = 0;
    translateX.value = withRepeat(
      withTiming(-waveWidth, {
        duration: 10000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [translateX, waveWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const path = [0, waveWidth]
    .map(
      (offsetX) =>
        `M ${offsetX} 50 Q ${offsetX + waveWidth / 4} 30, ${offsetX + waveWidth / 2} 50 Q ${offsetX + (waveWidth * 3) / 4} 70, ${offsetX + waveWidth} 50 V 200 H ${offsetX} Z`,
    )
    .join(" ");

  return (
    <View pointerEvents="none" style={styles.container}>
      <Animated.View
        style={[styles.content, { width: totalWaveWidth }, animatedStyle]}
      >
        <Svg
          width={totalWaveWidth}
          height="200"
          viewBox={`0 0 ${totalWaveWidth} 200`}
        >
          <Path fill={"rgb(158, 213, 255)"} d={path} />
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    height: "100%",
  },
});
