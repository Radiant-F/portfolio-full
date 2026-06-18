import { useEffect, useMemo, useRef, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { usePublicTheme } from "@/hooks";

const DEFAULT_DESCRIPTION_LIST = [
  "Software engineer of all kind!",
  "Everything about me!",
  "Offer many solutions for your professional needs.",
  "Skilled all-rounder developer.",
  "Big fan of common sense.",
  "Bi.",
  "Progressive.",
  "A dork!",
];

const FADE_DURATION = 400;
const BASE_DELAY = 1500;
const DELAY_PER_CHAR = 80;

function getDelay(text: string) {
  return BASE_DELAY + text.length * DELAY_PER_CHAR;
}

function getNextIndex(current: number, length: number) {
  if (length <= 1) return 0;

  let next: number;
  do {
    next = Math.floor(Math.random() * length);
  } while (next === current);
  return next;
}

export default function HeroDescription() {
  const { t, i18n } = useTranslation();
  const theme = usePublicTheme();
  const descriptionList = useMemo(() => {
    const translatedDescriptions = t("home.hero.description-list", {
      returnObjects: true,
      defaultValue: DEFAULT_DESCRIPTION_LIST,
    });

    return Array.isArray(translatedDescriptions) &&
      translatedDescriptions.length > 0
      ? translatedDescriptions
      : DEFAULT_DESCRIPTION_LIST;
  }, [i18n.language, t]);

  const [index, setIndex] = useState(0);
  const opacity = useSharedValue(1);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const swapRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const displayed = descriptionList[index] ?? descriptionList[0] ?? "";

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    setIndex(0);
    opacity.value = 1;
  }, [i18n.language, opacity]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      opacity.value = withTiming(0, { duration: FADE_DURATION });

      swapRef.current = setTimeout(() => {
        const next = getNextIndex(index, descriptionList.length);
        setIndex(next);
        opacity.value = withTiming(1, { duration: FADE_DURATION });
      }, FADE_DURATION);
    }, getDelay(displayed));

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (swapRef.current) clearTimeout(swapRef.current);
    };
  }, [index, displayed, descriptionList.length, opacity]);

  return (
    <Animated.Text style={[{ color: theme.textSecondary }, animatedStyle]}>
      {displayed}
    </Animated.Text>
  );
}
