import React, { useEffect, useRef, useMemo } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

type WeatherBackgroundProps = {
  weather: string;
};

export default function WeatherBackground({ weather }: WeatherBackgroundProps) {
  if (weather !== 'Rainy') return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: 40 }).map((_, i) => (
        <RainDrop key={i} />
      ))}
    </View>
  );
}

/* ───── 개별 빗방울 ───── */
function RainDrop() {
  const translateY = useRef(new Animated.Value(-100)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  /* 🔥 빗방울 개별 속성 (고정 랜덤) */
  const config = useMemo(() => {
    const depth = Math.random(); // 0~1 (깊이감)

    return {
      startX: Math.random() * width,
      delay: Math.random() * 2000,
      duration: 800 + depth * 1200,
      length: 12 + depth * 20,
      opacity: 0.15 + depth * 0.35,
      driftX: -10 + Math.random() * 20, // 바람
    };
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(config.delay),
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: height + 100,
            duration: config.duration,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: config.driftX,
            duration: config.duration,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -100,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, [config, translateX, translateY]);

  return (
    <Animated.View
      style={[
        styles.drop,
        {
          left: config.startX,
          height: config.length,
          opacity: config.opacity,
          transform: [{ translateY }, { translateX }],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  drop: {
    position: 'absolute',
    top: 0,
    width: 1.5,
    backgroundColor: 'rgba(200, 200, 255, 0.9)',
    borderRadius: 2,
  },
});
