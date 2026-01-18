import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const COLORS = {
  card: '#111122',
  accent: '#8A2BE2',
  textPrimary: '#FFFFFF',
  textSecondary: '#888899',
};

type MusicBarProps = {
  isPlaying: boolean;
  onOpen: () => void;
};

export default function MusicBar({ isPlaying, onOpen, }: MusicBarProps) {
  const router = useRouter();

  if (!isPlaying) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onOpen} 
      style={styles.wrapper}
    >
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png',
          }}
          style={styles.albumArt}
        />

        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            Midnight Rain
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            Taylor Swift
          </Text>
        </View>

        <View style={styles.controls}>
          <Ionicons name="pause" size={22} color={COLORS.textPrimary} />
          <Ionicons name="play-forward" size={22} color={COLORS.textPrimary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 60, // 탭바 바로 위
    zIndex: 100,
    marginHorizontal: 12,
  },
  container: {
    height: 68,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 10,
  },
  albumArt: {
    width: 42,
    height: 42,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  artist: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    gap: 14,
  },
});
