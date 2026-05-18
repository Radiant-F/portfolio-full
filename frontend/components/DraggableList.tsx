import React, { useCallback, useRef } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type DraggableItem = { id: string; [key: string]: any };

type DraggableListProps<T extends DraggableItem> = {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onReorder: (newData: T[]) => void;
  keyExtractor?: (item: T) => string;
  itemHeight?: number;
};

function DragHandle({ colors }: { colors: any }) {
  return (
    <View style={styles.dragHandle}>
      <MCIcons name="drag-vertical" size={22} color={colors.textMuted} />
    </View>
  );
}

type RowProps<T extends DraggableItem> = {
  item: T;
  index: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  onDragStart: (index: number) => void;
  onDragEnd: (fromIndex: number, toIndex: number) => void;
  itemHeight: number;
  totalCount: number;
  colors: any;
};

function DraggableRow<T extends DraggableItem>({
  item,
  index,
  renderItem,
  onDragStart,
  onDragEnd,
  itemHeight,
  totalCount,
  colors,
}: RowProps<T>) {
  const translateY = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const startY = useSharedValue(0);
  const currentIndex = useSharedValue(index);

  const pan = Gesture.Pan()
    .onBegin(() => {
      isDragging.value = true;
      startY.value = translateY.value;
      runOnJS(onDragStart)(index);
    })
    .onUpdate((e) => {
      translateY.value = startY.value + e.translationY;
      const newIndex = Math.round(index + e.translationY / itemHeight);
      currentIndex.value = Math.min(Math.max(newIndex, 0), totalCount - 1);
    })
    .onEnd(() => {
      const toIndex = currentIndex.value;
      translateY.value = withSpring(0, { damping: 15, stiffness: 200 });
      isDragging.value = false;
      runOnJS(onDragEnd)(index, toIndex);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    zIndex: isDragging.value ? 999 : 0,
    shadowOpacity: isDragging.value ? 0.18 : 0,
    shadowRadius: isDragging.value ? 8 : 0,
    shadowOffset: { width: 0, height: isDragging.value ? 4 : 0 },
    elevation: isDragging.value ? 6 : 0,
  }));

  return (
    <Animated.View
      style={[
        styles.row,
        animatedStyle,
        { backgroundColor: colors.card, borderColor: colors.cardBorder },
      ]}
    >
      <GestureDetector gesture={pan}>
        <DragHandle colors={colors} />
      </GestureDetector>
      <View style={styles.rowContent}>{renderItem(item, index)}</View>
    </Animated.View>
  );
}

export default function DraggableList<T extends DraggableItem>({
  data,
  renderItem,
  onReorder,
  keyExtractor,
  itemHeight = 64,
}: DraggableListProps<T>) {
  const { colors } = useTheme();

  const handleDragEnd = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (fromIndex === toIndex) return;
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const newData = [...data];
      const [moved] = newData.splice(fromIndex, 1);
      newData.splice(toIndex, 0, moved);
      onReorder(newData);
    },
    [data, onReorder],
  );

  const handleDragStart = useCallback((_index: number) => {
    // optional haptic feedback hook point
  }, []);

  return (
    <GestureHandlerRootView>
      <View>
        {data.map((item, index) => (
          <DraggableRow
            key={keyExtractor ? keyExtractor(item) : item.id}
            item={item}
            index={index}
            renderItem={renderItem}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            itemHeight={itemHeight}
            totalCount={data.length}
            colors={colors}
          />
        ))}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
    shadowColor: "#000",
  },
  dragHandle: {
    paddingHorizontal: 10,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  rowContent: {
    flex: 1,
    paddingRight: 12,
    paddingVertical: 8,
  },
});
