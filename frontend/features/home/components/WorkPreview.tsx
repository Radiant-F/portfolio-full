import { ButtonCustom } from "@/components";
import WorkPreviewButton, {
  getWrappedPaginationProgress,
} from "./WorkPreviewButton";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  LayoutChangeEvent,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useGetWorkScreenshotPreviewQuery } from "@/features/work";
import { usePublicTheme } from "@/hooks";

const AUTO_SLIDE_INTERVAL_MS = 3500;

type WorkPreviewSlide = {
  id: string;
  workId: string;
  imageUrl: string;
};

export default function WorkPreview() {
  const { data } = useGetWorkScreenshotPreviewQuery(null);
  const { width: viewportWidth } = useWindowDimensions();
  const theme = usePublicTheme();

  const previewItems = useMemo<WorkPreviewSlide[]>(() => {
    if (!data?.length) {
      return [];
    }

    return data.map((item) => ({
      id: item.id,
      workId: item.workId,
      imageUrl: item.imageUrl,
    }));
  }, [data]);

  const slideCount = previewItems.length;
  const carouselSlides = useMemo<WorkPreviewSlide[]>(() => {
    if (slideCount <= 1) {
      return previewItems;
    }

    return [...previewItems, previewItems[0]];
  }, [previewItems, slideCount]);

  const previewWidth = Math.min(400, Math.max(280, viewportWidth - 32));
  const previewHeight = Math.min(550, previewWidth * 1.375);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [paginationWidth, setPaginationWidth] = useState(previewWidth);
  const buttonWidth = slideCount > 0 ? paginationWidth / slideCount : 0;

  const scrollRef = useRef<FlatList<WorkPreviewSlide>>(null);
  const autoplayEnabledRef = useRef(isAutoplayEnabled);
  const hoveredRef = useRef(false);
  const draggingRef = useRef(false);
  const currentIndexRef = useRef(0);

  const progress = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      progress.value = event.contentOffset.x / previewWidth;
    },
  });

  const pauseAutoplay = useCallback(() => {
    hoveredRef.current = true;
    setIsHoverPaused(true);
  }, []);

  const resumeAutoplay = useCallback(() => {
    hoveredRef.current = false;
    setIsHoverPaused(false);
  }, []);

  const toggleAutoplay = useCallback(() => {
    setIsAutoplayEnabled((currentValue) => {
      const nextValue = !currentValue;
      autoplayEnabledRef.current = nextValue;
      return nextValue;
    });
  }, []);

  const handlePaginationLayout = useCallback((event: LayoutChangeEvent) => {
    const nextWidth = event.nativeEvent.layout.width;

    setPaginationWidth((currentWidth) =>
      currentWidth === nextWidth ? currentWidth : nextWidth,
    );
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      currentIndexRef.current = index;
      scrollRef.current?.scrollToOffset({
        offset: index * previewWidth,
        animated: true,
      });
    },
    [previewWidth],
  );

  const handleMomentumEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (slideCount <= 1) {
        currentIndexRef.current = 0;
        draggingRef.current = false;
        return;
      }

      const nextIndex = Math.round(
        event.nativeEvent.contentOffset.x / previewWidth,
      );

      if (nextIndex >= slideCount) {
        currentIndexRef.current = 0;
        progress.value = 0;
        scrollRef.current?.scrollToOffset({ offset: 0, animated: false });
      } else {
        currentIndexRef.current = nextIndex;
      }

      draggingRef.current = false;
    },
    [previewWidth, progress, slideCount],
  );

  useEffect(() => {
    currentIndexRef.current = 0;
    progress.value = 0;
    scrollRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [previewItems, progress]);

  useEffect(() => {
    autoplayEnabledRef.current = isAutoplayEnabled;
  }, [isAutoplayEnabled]);

  useEffect(() => {
    if (slideCount <= 1) {
      return;
    }

    const intervalId = setInterval(() => {
      if (
        !autoplayEnabledRef.current ||
        hoveredRef.current ||
        draggingRef.current
      ) {
        return;
      }

      if (currentIndexRef.current >= slideCount) {
        currentIndexRef.current = 0;
        progress.value = 0;
        scrollRef.current?.scrollToOffset({ offset: 0, animated: false });
      }

      const nextIndex = currentIndexRef.current + 1;
      currentIndexRef.current = nextIndex;

      scrollRef.current?.scrollToOffset({
        offset: nextIndex * previewWidth,
        animated: true,
      });
    }, AUTO_SLIDE_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [previewWidth, progress, slideCount]);

  const indicatorStyle = useAnimatedStyle(() => {
    const indicatorIndex = getWrappedPaginationProgress(
      progress.value,
      slideCount,
    );

    return {
      transform: [{ translateX: indicatorIndex * buttonWidth }],
    };
  });

  const autoplayIconName =
    !isAutoplayEnabled || isHoverPaused ? "play" : "pause";

  const renderSlide = useCallback(
    ({ item }: ListRenderItemInfo<WorkPreviewSlide>) => (
      <View style={{ width: previewWidth, height: previewHeight }}>
        <Image
          source={{ uri: item.imageUrl }}
          resizeMethod="resize"
          resizeMode="cover"
          blurRadius={5}
          style={styles.imgBackdrop}
        />
        <Image
          source={{ uri: item.imageUrl }}
          resizeMethod="resize"
          resizeMode="contain"
          style={styles.imgForeground}
        />
      </View>
    ),
    [previewHeight, previewWidth],
  );

  const getSlideLayout = useCallback(
    (_: ArrayLike<WorkPreviewSlide> | null | undefined, index: number) => ({
      length: previewWidth,
      offset: previewWidth * index,
      index,
    }),
    [previewWidth],
  );

  return (
    <View style={[{ gap: 10 }, { width: previewWidth }]}>
      <Pressable
        onHoverIn={pauseAutoplay}
        onHoverOut={resumeAutoplay}
        style={[
          styles.viewWorkPreview,
          {
            width: previewWidth,
            height: previewHeight,
            backgroundColor: theme.surface,
          },
        ]}
      >
        <Animated.FlatList
          ref={scrollRef}
          data={carouselSlides}
          horizontal
          pagingEnabled
          bounces={false}
          decelerationRate="fast"
          disableIntervalMomentum
          getItemLayout={getSlideLayout}
          initialNumToRender={1}
          keyExtractor={(item, index) => `${item.workId}-${index}`}
          maxToRenderPerBatch={2}
          removeClippedSubviews
          renderItem={renderSlide}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          windowSize={3}
          onScroll={handleScroll}
          onScrollBeginDrag={() => {
            draggingRef.current = true;
          }}
          onScrollEndDrag={() => {
            draggingRef.current = false;
          }}
          onMomentumScrollEnd={handleMomentumEnd}
        />
      </Pressable>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable
          onLayout={handlePaginationLayout}
          onHoverIn={pauseAutoplay}
          onHoverOut={resumeAutoplay}
          style={{
            ...styles.viewImageNumber,
            backgroundColor: theme.buttonSecondaryBackground,
          }}
        >
          <Animated.View
            pointerEvents="none"
            style={[
              styles.activeButtonBackground,
              {
                backgroundColor: theme.accent,
                borderColor: theme.buttonSecondaryBackground,
              },
              {
                width: buttonWidth,
              },
              indicatorStyle,
            ]}
          />
          {previewItems.map((item, index) => (
            <WorkPreviewButton
              key={`${item.workId}-${index}`}
              index={index}
              progress={progress}
              slideCount={slideCount}
              onHoverIn={pauseAutoplay}
              onHoverOut={resumeAutoplay}
              onPress={scrollToIndex}
            />
          ))}
        </Pressable>
        <ButtonCustom
          onPress={toggleAutoplay}
          style={{
            ...styles.btnAutoplayToggle,
            backgroundColor: theme.buttonSecondaryBackground,
          }}
        >
          <MCIcons
            name={autoplayIconName}
            color={theme.buttonSecondaryText}
            size={20}
          />
        </ButtonCustom>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnAutoplayToggle: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  imgBackdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.5,
  },
  imgForeground: {
    width: "100%",
    height: "100%",
  },
  activeButtonBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    borderWidth: 5,
    borderRadius: 35 / 2,
  },
  viewImageNumber: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 35 / 2,
    overflow: "hidden",
    position: "relative",
    flex: 1,
  },
  viewWorkPreview: {
    elevation: 5,
    borderRadius: 20,
    width: 400,
    height: 550,
    overflow: "hidden",
  },
});
