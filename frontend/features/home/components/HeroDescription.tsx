import { useEffect, useRef, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const DESCRIPTION_LIST = [
  "Software engineer of all kind!",
  "Everything about me!",
  "Offer many solutions for your professional needs.",
  "Skilled all-rounder developer.",
  "Cultured.",
  "Introverted.",
  "Big fan of common sense!",
  "Bi.",
  "Self-taught.",
  "Adapted.",
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
  let next: number;
  do {
    next = Math.floor(Math.random() * length);
  } while (next === current);
  return next;
}

export default function HeroDescription() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState(DESCRIPTION_LIST[0]);
  const opacity = useSharedValue(1);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const swapRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      opacity.value = withTiming(0, { duration: FADE_DURATION });

      swapRef.current = setTimeout(() => {
        const next = getNextIndex(index, DESCRIPTION_LIST.length);
        setIndex(next);
        setDisplayed(DESCRIPTION_LIST[next]);
        opacity.value = withTiming(1, { duration: FADE_DURATION });
      }, FADE_DURATION);
    }, getDelay(displayed));

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (swapRef.current) clearTimeout(swapRef.current);
    };
  }, [index, displayed]);

  return (
    <Animated.Text style={[{ color: "rgb(172, 193, 210)" }, animatedStyle]}>
      {displayed}
    </Animated.Text>
  );
}
