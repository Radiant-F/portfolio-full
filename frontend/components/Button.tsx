import {
  Animated,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React, { useRef } from "react";
import { useTheme } from "@/hooks";

type ButtonPropsType = {
  title?: string;
  style?: StyleProp<ViewStyle>;
};

export default React.forwardRef<
  View,
  ButtonPropsType & React.ComponentProps<typeof Pressable>
>(function Button({ title, children, style, ...rest }, ref) {
  const { motion, typography } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  return (
    <Pressable
      ref={ref}
      {...rest}
      onPressIn={(e) => {
        rest.onPressIn?.(e);
        if (rest.disabled) return;
        Animated.spring(scaleAnim, {
          toValue: motion.pressScale,
          useNativeDriver: true,
          speed: 50,
          bounciness: 0,
        }).start();
      }}
      onPressOut={(e) => {
        rest.onPressOut?.(e);
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 20,
          bounciness: 8,
        }).start();
      }}
    >
      {(state) => (
        <Animated.View
          style={[
            style,
            rest.disabled && { opacity: 0.55 },
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          {typeof children === "function" ? children(state) : children}
          {title && (
            <Text style={{ fontFamily: typography.bodyBold }}>{title}</Text>
          )}
        </Animated.View>
      )}
    </Pressable>
  );
});
