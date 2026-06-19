import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ButtonCustom from "./ButtonCustom";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";
import { ScrollView } from "react-native-gesture-handler";
import { usePublicTheme } from "@/hooks";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type MaterialCommunityIconName = keyof typeof MCIcons.glyphMap;

type ModalCustomType = {
  onClose?: () => void;
  visible?: boolean;
  showHeader?: boolean;
  maxWidth?: number;
  maxContentHeight?: number;
  title?: string;
  customHeaderInfoStart?: React.ReactNode;
  showHeaderInfoStart?: boolean;
  iconHeaderInfoStart?: MaterialCommunityIconName;
  children?: React.ReactNode;
};

export default function ModalCustom({
  onClose,
  visible = true,
  maxWidth,
  maxContentHeight,
  title = "Header Title",
  customHeaderInfoStart,
  showHeaderInfoStart = true,
  iconHeaderInfoStart = "ab-testing",
  children,
  showHeader = true,
}: ModalCustomType) {
  const theme = usePublicTheme();
  const [mounted, setMounted] = useState(visible);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      if (!mounted) {
        setMounted(true);
      }

      progress.value = 0;
      progress.value = withTiming(1, {
        duration: 240,
        easing: Easing.out(Easing.cubic),
      });
      return;
    }

    if (!mounted) return;

    progress.value = withTiming(
      0,
      {
        duration: 180,
        easing: Easing.in(Easing.cubic),
      },
      (finished) => {
        if (finished) {
          runOnJS(setMounted)(false);
        }
      },
    );
  }, [mounted, progress, visible]);

  function handleClose() {
    if (!mounted) return;

    progress.value = withTiming(
      0,
      {
        duration: 180,
        easing: Easing.in(Easing.cubic),
      },
      (finished) => {
        if (finished) {
          runOnJS(setMounted)(false);
          if (onClose) {
            runOnJS(onClose)();
          }
        }
      },
    );
  }

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const headerStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { translateY: (1 - progress.value) * 10 },
      { scale: 0.95 + progress.value * 0.05 },
    ],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { translateY: (1 - progress.value) * 10 },
      { scale: 0.98 + progress.value * 0.02 },
    ],
  }));

  if (!mounted) return null;

  return (
    <Modal
      animationType="none"
      visible={mounted}
      transparent
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <AnimatedPressable
          style={[
            styles.backdrop,
            { backgroundColor: theme.overlayBackdrop },
            backdropStyle,
          ]}
          onPress={handleClose}
        />
        <Animated.View
          style={[
            styles.content,
            { borderColor: theme.border },
            { ...(maxWidth ? { maxWidth } : null) },
            contentStyle,
          ]}
        >
          {showHeader && (
            <Animated.View style={[styles.header, headerStyle]}>
              {showHeaderInfoStart && (
                <View
                  style={{
                    ...styles.viewHeaderInfo,
                    backgroundColor: theme.surface,
                  }}
                >
                  {customHeaderInfoStart ?? (
                    <MCIcons
                      name={iconHeaderInfoStart}
                      size={20}
                      color={theme.textSecondary}
                    />
                  )}
                </View>
              )}
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    ...styles.viewHeaderTitle,
                    backgroundColor: theme.surface,
                  }}
                >
                  <Text
                    style={{
                      ...styles.textHeaderTitle,
                      color: theme.accentContrastText,
                    }}
                    numberOfLines={1}
                  >
                    {title}
                  </Text>
                </View>
              </View>
              <ButtonCustom
                style={{
                  ...styles.viewHeaderInfo,
                  backgroundColor: theme.surface,
                }}
                onPress={handleClose}
              >
                <MCIcons
                  name="close-circle-outline"
                  size={20}
                  color={theme.textSecondary}
                />
              </ButtonCustom>
            </Animated.View>
          )}
          <View
            style={[
              styles.viewContent,
              { backgroundColor: theme.surface },
              { maxHeight: maxContentHeight ? maxContentHeight : null },
            ]}
          >
            <ScrollView style={{ width: "100%" }}>{children}</ScrollView>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewContent: {
    width: "100%",
    flexShrink: 1,
    minHeight: 120,
    borderRadius: 50 / 2,
    elevation: 5,
    overflow: "hidden",
  },
  textHeaderTitle: {
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  viewHeaderTitle: {
    height: 50,
    borderRadius: 50 / 2,
    paddingHorizontal: 20,
    justifyContent: "center",
    elevation: 3,
    alignSelf: "flex-start",
    maxWidth: "100%",
  },
  viewHeaderInfo: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    gap: 10,
  },
  content: {
    width: "80%",
    maxWidth: 580,
    maxHeight: "90%",
    minHeight: 180,
    gap: 10,
    // borderWidth: 1,
    borderRadius: 28,
    padding: 2,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  backdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
