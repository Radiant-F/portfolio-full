import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "@/hooks";

type FormInputProps = TextInputProps & {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export default function FormInput({
  label,
  error,
  containerStyle,
  leftIcon,
  rightIcon,
  style,
  onFocus,
  onBlur,
  ...rest
}: FormInputProps) {
  const { colors, radius, typography, motion, design } = useTheme();
  const [focused, setFocused] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = (
    e: Parameters<NonNullable<TextInputProps["onFocus"]>>[0],
  ) => {
    setFocused(true);
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: motion.standard,
      useNativeDriver: false,
    }).start();
    onFocus?.(e);
  };

  const handleBlur = (
    e: Parameters<NonNullable<TextInputProps["onBlur"]>>[0],
  ) => {
    setFocused(false);
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: motion.standard,
      useNativeDriver: false,
    }).start();
    onBlur?.(e);
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      error ? colors.error : colors.inputBorder,
      error ? colors.error : colors.inputFocusBorder,
    ],
  });

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? (
        <Text
          style={[
            styles.label,
            {
              color: error
                ? colors.error
                : focused
                  ? colors.primary
                  : colors.textSecondary,
              fontFamily: focused ? typography.bodyBold : typography.body,
              letterSpacing: typography.eyebrowSpacing * 0.1,
            },
          ]}
        >
          {label}
        </Text>
      ) : null}

      <Animated.View
        style={[
          styles.inputRow,
          {
            backgroundColor: colors.inputBackground,
            borderColor,
            borderRadius: radius.md,
            borderWidth: Math.max(1.25, design.chrome.borderWeight),
          },
        ]}
      >
        {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}

        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              flex: 1,
              fontFamily: typography.body,
            },
            style,
          ]}
          placeholderTextColor={colors.textMuted}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />

        {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
      </Animated.View>

      {error ? (
        <Text
          style={[
            styles.errorText,
            { color: colors.error, fontFamily: typography.body },
          ]}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontFamily: "LexendRegular",
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 48,
    paddingHorizontal: 12,
  },
  input: {
    fontSize: 15,
    paddingVertical: 10,
  },
  icon: {
    marginHorizontal: 4,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});
