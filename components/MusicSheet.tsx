import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const COLORS = {
  background: '#0A0A1E',
  card: '#111122',
  textPrimary: '#FFFFFF',
  textSecondary: '#888899',
};

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function MusicSheet({ visible, onClose }: Props) {
  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : height,
      duration: 320,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY }] },
      ]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="chevron-down" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* 플레이리스트 */}
      <View style={styles.content}>
        {[
          'Midnight Rain · Taylor Swift',
          'Nights · Frank Ocean',
          'After Dark · Drake',
        ].map((song, i) => (
          <View key={i} style={styles.songCard}>
            <Text style={styles.songText}>{song}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.background,
    zIndex: 200,
  },
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  songCard: {
    backgroundColor: COLORS.card,
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
  },
  songText: {
    color: COLORS.textPrimary,
    fontSize: 14,
  },
});
