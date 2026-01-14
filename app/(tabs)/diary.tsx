import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 디자인 상수 (전역 테마 일치)
const COLORS = {
  background: '#0A0A1E', // Deep Dark Blue
  card: '#111122',       // Card Background (slightly lighter)
  accent: '#8A2BE2',     // Neon Purple
  textPrimary: '#FFFFFF',
  textSecondary: '#888899',
  tagBackground: '#2A2A40', // 태그 배경색
};

interface DiaryEntry {
  id: string;
  dayLabel: string; // Today, Yesterday 등
  time: string;
  location: string;
  weather: 'Sunny' | 'Rainy' | 'Cloudy' | 'Snowy'; // 아이콘 매핑용
  weatherLabel: string;
  title: string;
  artist: string;
  mood: string;
  temperature: string;
  albumArt: string; // 이미지 URL
  memo: string;
}

// UI 이미지에 있는 데이터 그대로 Mocking
const mockDiaries: DiaryEntry[] = [
  { 
    id: '1', 
    dayLabel: 'Today', 
    time: '2:35 PM', 
    location: 'Seoul, Gangnam', 
    weather: 'Rainy',
    weatherLabel: 'Rainy',
    title: 'Midnight Rain', 
    artist: 'Taylor Swift', 
    mood: 'Melancholy', 
    temperature: '32.1°C',
    albumArt: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png', // 예시 이미지
    memo: '"Perfect rainy afternoon vibes while working at the cafe"' 
  },
  { 
    id: '2', 
    dayLabel: 'Yesterday', 
    time: '7:20 AM', 
    location: 'Seoul, Hongdae', 
    weather: 'Sunny',
    weatherLabel: 'Sunny',
    title: 'Levitating', 
    artist: 'Dua Lipa', 
    mood: 'Energetic', 
    temperature: '38.5°C',
    albumArt: 'https://upload.wikimedia.org/wikipedia/en/f/f5/Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png', // 예시 이미지
    memo: '"Morning energy boost on my way to the gym"' 
  },
  
];

// 날씨 아이콘 매핑 함수
const getWeatherIcon = (weather: string) => {
  switch (weather) {
    case 'Sunny': return 'sunny';
    case 'Rainy': return 'rainy';
    case 'Cloudy': return 'cloudy';
    case 'Snowy': return 'snow';
    default: return 'partly-sunny';
  }
};

export default function DiaryScreen() {
  
  // 리스트 헤더 (상단 문구)
  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>
        Every song tells a story of where you were and how you felt
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <FlatList 
        data={mockDiaries}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            
            {/* 1. 상단: 시간 및 위치 정보 */}
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.dayLabel}>{item.dayLabel}</Text>
                <Text style={styles.timeLabel}>{item.time}</Text>
              </View>
              <View style={styles.locationContainer}>
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={14} color={COLORS.textSecondary} />
                  <Text style={styles.locationText}>{item.location}</Text>
                </View>
                <View style={styles.locationRow}>
                  <Ionicons name={getWeatherIcon(item.weather)} size={14} color={COLORS.accent} />
                  <Text style={[styles.locationText, { color: COLORS.accent }]}> {item.weatherLabel}</Text>
                </View>
              </View>
            </View>

            {/* 2. 중간: 앨범 아트 및 노래 정보 */}
            <View style={styles.musicContainer}>
              <Image source={{ uri: item.albumArt }} style={styles.albumArt} />
              <View style={styles.musicInfo}>
                <Text style={styles.songTitle}>{item.title}</Text>
                <Text style={styles.artistName}>{item.artist}</Text>
                
                {/* 태그 (Mood, Temp) */}
                <View style={styles.tagsRow}>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{item.mood}</Text>
                  </View>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{item.temperature}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* 3. 하단: 메모 (인용구 스타일) */}
            <Text style={styles.memoText}>{item.memo}</Text>

          </View>
        )}
      />

      {/* 플로팅 버튼 (글쓰기) */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="pencil" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background, 
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // FAB 공간 확보
  },
  
  // --- 헤더 ---
  headerContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: 'center',
  },

  // --- 카드 스타일 ---
  card: { 
    backgroundColor: COLORS.card, 
    borderRadius: 24, 
    padding: 24, 
    marginBottom: 20, 
    // 미세한 그림자 (네온 느낌)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  
  // 1. 카드 헤더 (시간/장소)
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  dayLabel: { 
    color: COLORS.textSecondary, 
    fontSize: 13, 
    marginBottom: 4 
  },
  timeLabel: { 
    color: COLORS.textPrimary, 
    fontSize: 24, 
    fontWeight: '800' 
  },
  locationContainer: {
    alignItems: 'flex-end',
    gap: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },

  // 2. 뮤직 정보 섹션
  musicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#333', // 이미지 로딩 전 배경
  },
  musicInfo: {
    marginLeft: 16,
    flex: 1,
  },
  songTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  artistName: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: 'rgba(138, 43, 226, 0.2)', // 보라색 투명 배경
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.5)',
  },
  tagText: {
    color: '#D0A9F5', // 연한 보라색 텍스트
    fontSize: 11,
    fontWeight: '600',
  },

  // 3. 메모 섹션
  memoText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  },

  // --- FAB (글쓰기 버튼) ---
  fab: { 
    position: 'absolute', 
    right: 20, 
    bottom: 30, 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: COLORS.accent, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 8,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});