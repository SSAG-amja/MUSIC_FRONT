import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

/* ───── 디자인 상수 (Diary와 완전 통일) ───── */
const COLORS = {
  background: '#0A0A1E',
  card: '#111122',
  accent: '#8A2BE2',
  textPrimary: '#FFFFFF',
  textSecondary: '#888899',
};

/* ───── 타입 정의 ───── */
interface Album {
  id: string;
  title: string;
  createdAt: string;
  location: string;
  weather: 'Sunny' | 'Rainy' | 'Cloudy' | 'Snowy';
  mood: string;
  activity: string;
  songsPreview: string[];
}

/* ───── Mock 데이터 ───── */
const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'Rainy Work Flow',
    createdAt: 'Today · 3:10 PM',
    location: 'Seoul, Gangnam',
    weather: 'Rainy',
    mood: 'Calm',
    activity: 'Work',
    songsPreview: [
      'Midnight Rain · Taylor Swift',
      'Nights · Frank Ocean',
      'After Dark · Drake',
      'Slow Dancing · V',
    ],
  },
  {
    id: '2',
    title: 'Morning Energy Boost',
    createdAt: 'Yesterday · 7:30 AM',
    location: 'Seoul, Hongdae',
    weather: 'Sunny',
    mood: 'Energetic',
    activity: 'Exercise',
    songsPreview: [
      'Levitating · Dua Lipa',
      'Blinding Lights · The Weeknd',
    ],
  },
];

/* ───── 날씨 아이콘 매핑 ───── */
const getWeatherIcon = (weather: string) => {
  switch (weather) {
    case 'Sunny': return 'sunny';
    case 'Rainy': return 'rainy';
    case 'Cloudy': return 'cloudy';
    case 'Snowy': return 'snow';
    default: return 'partly-sunny';
  }
};

export default function AlbumScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* ───── 상단 문구 (Diary 톤과 맞춤) ───── */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Playlists you loved enough to keep
        </Text>
      </View>

      <FlatList
        data={mockAlbums}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const previewSongs = item.songsPreview.slice(0, 3);
          const remainingCount = item.songsPreview.length - 3;

          return (
            <TouchableOpacity style={styles.card} activeOpacity={0.9}>
              {/* ───── 카드 헤더 ───── */}
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.albumTitle}>{item.title}</Text>
                  <Text style={styles.albumTime}>{item.createdAt}</Text>
                </View>

                <View style={styles.weatherRow}>
                  <Ionicons
                    name={getWeatherIcon(item.weather)}
                    size={14}
                    color={COLORS.accent}
                  />
                  <Text style={styles.weatherText}>{item.weather}</Text>
                </View>
              </View>

              {/* ───── 태그 (Diary와 동일) ───── */}
              <View style={styles.tagsRow}>
                {[item.mood, item.activity, item.location].map((tag, idx) => (
                  <View key={idx} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              {/* ───── 곡 미리보기 (최대 3곡) ───── */}
              <View style={styles.previewSection}>
                {previewSongs.map((song, idx) => (
                  <Text key={idx} style={styles.songPreview}>
                    • {song}
                  </Text>
                ))}

                {remainingCount > 0 && (
                  <Text style={styles.moreText}>
                    …and {remainingCount} more
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

/* ───── 스타일 (Diary와 동일한 카드 톤) ───── */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: 'center',
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,

    /* 🔥 diary.tsx와 완전 동일한 그림자 */
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  albumTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  albumTime: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },

  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  weatherText: {
    color: COLORS.accent,
    fontSize: 12,
  },

  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: 'rgba(138, 43, 226, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.5)',
  },
  tagText: {
    color: '#D0A9F5',
    fontSize: 11,
    fontWeight: '600',
  },

  previewSection: {
    gap: 6,
  },
  songPreview: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  moreText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 4,
  },
});
