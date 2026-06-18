import { Animated, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { useCallback, useEffect, useRef } from "react";
import { usePublicTheme } from "@/hooks";

export default function LoadingIndicator() {
  const theme = usePublicTheme();
  const rotation = useRef(new Animated.Value(0)).current;
  const currentRotation = useRef(0);

  const animate = useCallback(() => {
    currentRotation.current += 90;
    Animated.spring(rotation, {
      toValue: currentRotation.current,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  }, [rotation]);

  useEffect(() => {
    const interval = setInterval(() => {
      animate();
    }, 500);
    return () => clearInterval(interval);
  }, [animate]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
    extrapolate: "extend",
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...styles.iconContainer,
          transform: [{ rotate: rotateInterpolate }],
        }}
      >
        <Icon name="atom-variant" size={50} color={theme.textSecondary} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.25,
  },
});
