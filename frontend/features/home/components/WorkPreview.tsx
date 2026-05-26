import { ButtonCustom } from "@/components";
import WorkPreviewButton, {
  getWrappedPaginationProgress,
} from "./WorkPreviewButton";
import { useCallback, useEffect, useRef, useState } from "react";
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

const responseWorkPreview = [
  {
    id: "em26qin9pbqrddd1ydztopef",
    workId: "dhgnbw6nugb4ff9p7nkhuso6",
    imageUrl: require("@/assets/images/qing/1.png"),
  },
  {
    id: "ffnzv5dtrzc9izgl5r39drhv",
    workId: "tinqtmfx6dyw4iebn8n87yxt",
    imageUrl: require("@/assets/images/qing/4.png"),
  },
  {
    id: "h7mv60chh13zudy7pxxyy6bv",
    workId: "vod3l2ad6vijj6qdtrdp0sgq",
    imageUrl: require("@/assets/images/qing/5.png"),
  },
  {
    id: "rjkgq8hzc14hw11bohpj02nt",
    workId: "iddknqwao4xqg6doo3bht5qy",
    imageUrl: require("@/assets/images/qing/7.png"),
  },
  {
    id: "rjkgq8hzc14hw11bohpj02nt",
    workId: "iddknqwao4xqg6doo3bht5qy",
    imageUrl: require("@/assets/images/qing/8.png"),
  },
  {
    id: "s5g69n00x9yr154j0n75b63o",
    workId: "qdzdojyj9sv04xbre68xaozg",
    imageUrl: require("@/assets/images/qing/2.png"),
  },
  {
    id: "uvvat7rcnwiaiyc03utdi3e7",
    workId: "tj917vkwjebysaoimzdzpisq",
    imageUrl: require("@/assets/images/qing/3.png"),
  },
  {
    id: "rjkgq8hzc14hw11bohpj02nt",
    workId: "iddknqwao4xqg6doo3bht5qy",
    imageUrl: require("@/assets/images/qing/6.png"),
  },
];

const AUTO_SLIDE_INTERVAL_MS = 3500;

const carouselSlides = [...responseWorkPreview, responseWorkPreview[0]];

type WorkPreviewSlide = (typeof carouselSlides)[number];

export default function WorkPreview() {
  const { width: viewportWidth } = useWindowDimensions();

  const previewWidth = Math.min(400, Math.max(280, viewportWidth - 32));
  const previewHeight = Math.min(550, previewWidth * 1.375);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [paginationWidth, setPaginationWidth] = useState(previewWidth);
  const buttonWidth = paginationWidth / responseWorkPreview.length;

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
      const nextIndex = Math.round(
        event.nativeEvent.contentOffset.x / previewWidth,
      );

      if (nextIndex >= responseWorkPreview.length) {
        currentIndexRef.current = 0;
        progress.value = 0;
        scrollRef.current?.scrollToOffset({ offset: 0, animated: false });
      } else {
        currentIndexRef.current = nextIndex;
      }

      draggingRef.current = false;
    },
    [previewWidth, progress],
  );

  useEffect(() => {
    autoplayEnabledRef.current = isAutoplayEnabled;
  }, [isAutoplayEnabled]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (
        !autoplayEnabledRef.current ||
        hoveredRef.current ||
        draggingRef.current
      ) {
        return;
      }

      if (currentIndexRef.current >= responseWorkPreview.length) {
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
  }, [previewWidth, progress]);

  const indicatorStyle = useAnimatedStyle(() => {
    const slideCount = responseWorkPreview.length;
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
          source={item.imageUrl}
          resizeMethod="resize"
          resizeMode="cover"
          blurRadius={5}
          style={styles.imgBackdrop}
        />
        <Image
          source={item.imageUrl}
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
          { width: previewWidth, height: previewHeight },
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
          style={styles.viewImageNumber}
        >
          <Animated.View
            pointerEvents="none"
            style={[
              styles.activeButtonBackground,
              {
                width: buttonWidth,
              },
              indicatorStyle,
            ]}
          />
          {responseWorkPreview.map((item, index) => (
            <WorkPreviewButton
              key={`${item.workId}-${index}`}
              index={index}
              progress={progress}
              slideCount={responseWorkPreview.length}
              onHoverIn={pauseAutoplay}
              onHoverOut={resumeAutoplay}
              onPress={scrollToIndex}
            />
          ))}
        </Pressable>
        <ButtonCustom onPress={toggleAutoplay} style={styles.btnAutoplayToggle}>
          <MCIcons
            name={autoplayIconName}
            color={"rgb(224, 242, 255)"}
            size={20}
          />
        </ButtonCustom>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnAutoplayToggle: {
    backgroundColor: "rgb(39, 48, 58)",
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
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
    backgroundColor: "rgb(158, 213, 255)",
    borderWidth: 5,
    borderColor: "rgb(39, 48, 58)",
    borderRadius: 35 / 2,
  },
  viewImageNumber: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgb(39, 48, 58)",
    borderRadius: 35 / 2,
    overflow: "hidden",
    position: "relative",
    flex: 1,
  },
  viewWorkPreview: {
    backgroundColor: "rgb(30, 31, 36)",
    elevation: 5,
    borderRadius: 20,
    width: 400,
    height: 550,
    overflow: "hidden",
  },
});
