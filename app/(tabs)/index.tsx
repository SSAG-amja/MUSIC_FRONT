import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- 컬러 및 스타일 상수 정의 ---
const BG_COLOR = '#0A0A1A'; // 전체 배경색 (어두운 남색)
const CARD_BG_COLOR = '#14142B'; // 카드 배경색
const TEXT_COLOR = '#FFFFFF'; // 기본 흰색 텍스트
const ACCENT_COLOR = '#7F56D9'; // 강조색 (시안의 보라색)
const SUB_TEXT_COLOR = '#9A9AB0'; // 보조 텍스트 색상

export default function HomeScreen() {
  // 상태 관리
  const [weather, setWeather] = useState<string>('Rainy'); // 날씨 예시 데이터
  const [location, setLocation] = useState<string>('Seoul, South Korea'); // 위치 예시 데이터
  const [selectedMood, setSelectedMood] = useState<string | null>(null); // 선택된 기분
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null); // 선택된 활동

  // 기분 데이터 배열
  const moods = [
    { id: 'happy', label: 'Happy', icon: 'happy-outline' },
    { id: 'melancholy', label: 'Melancholy', icon: 'sad-outline' },
    { id: 'energetic', label: 'Energetic', icon: 'flash-outline' },
  ];

  // 활동 데이터 배열
  const activities = [
    { id: 'working', label: 'Working', icon: 'briefcase-outline' }, // 아이콘 변경 (시안과 유사하게)
    // 필요시 추가: { id: 'relaxing', label: 'Relaxing', icon: 'cafe-outline' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 상단 위치 & 날씨 정보 영역 */}
      <View style={styles.topBar}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={18} color={SUB_TEXT_COLOR} />
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <View style={styles.weatherContainer}>
          <Ionicons name="rainy-outline" size={18} color={SUB_TEXT_COLOR} />
          <Text style={styles.weatherText}>{weather}</Text>
        </View>
      </View>

      {/* 메인 타이틀 영역 */}
      <View style={styles.header}>
        <Text style={styles.title}>
          What's your{'\n'}
          <Text style={styles.highlightText}>atmosphere</Text> today?
        </Text>
        <Text style={styles.subtitle}>Let AI curate the perfect soundtrack for your moment</Text>
      </View>

      {/* 기분 선택 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How are you feeling?</Text>
        <Text style={styles.sectionSubtitle}>Select your current mood</Text>
        
        <View style={styles.moodContainer}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodCard,
                selectedMood === mood.id && styles.selectedCard, // 선택 시 스타일 적용
              ]}
              onPress={() => setSelectedMood(mood.id)}
            >
              <Ionicons 
                name={mood.icon as any} 
                size={32} 
                // 선택된 상태에 따라 아이콘 색상 변경
                color={selectedMood === mood.id ? ACCENT_COLOR : TEXT_COLOR} 
              />
              <Text style={[
                styles.cardLabel,
                selectedMood === mood.id && styles.selectedLabel // 선택된 상태에 따라 텍스트 스타일 변경
              ]}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 활동 선택 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What are you doing?</Text>
        <Text style={styles.sectionSubtitle}>Choose your current activity</Text>

        {activities.map((act) => (
          <TouchableOpacity
            key={act.id}
            style={[
              styles.activityCard,
              selectedActivity === act.id && styles.selectedCard, // 선택 시 스타일 적용
            ]}
            onPress={() => setSelectedActivity(act.id)}
          >
            <View style={styles.iconCircle}>
              <Ionicons name={act.icon as any} size={24} color={TEXT_COLOR} />
            </View>
            <Text style={styles.activityLabel}>{act.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: BG_COLOR, // 전체 어두운 배경 적용
    paddingTop: 60, // 상태바 공간 확보
  },
  // 상단 바 스타일
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  locationContainer: { flexDirection: 'row', alignItems: 'center' },
  weatherContainer: { flexDirection: 'row', alignItems: 'center' },
  locationText: { color: SUB_TEXT_COLOR, marginLeft: 8, fontSize: 14, fontWeight: '500' },
  weatherText: { color: SUB_TEXT_COLOR, marginLeft: 8, fontSize: 14, fontWeight: '500' },

  // 헤더 스타일
  header: { marginBottom: 40 },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: TEXT_COLOR,
    lineHeight: 42,
    letterSpacing: 0.5,
  },
  highlightText: { color: ACCENT_COLOR }, // 강조색 적용
  subtitle: {
    fontSize: 16,
    color: SUB_TEXT_COLOR,
    marginTop: 12,
    lineHeight: 24,
  },

  // 섹션 공통 스타일
  section: { marginBottom: 40 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: TEXT_COLOR, marginBottom: 8 },
  sectionSubtitle: { fontSize: 15, color: SUB_TEXT_COLOR, marginBottom: 20 },

  // 기분 선택 카드 스타일
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodCard: {
    width: '31%', // 3개 배치 시 간격 고려
    aspectRatio: 1 / 1.1, // 약간 세로로 긴 직사각형 비율
    backgroundColor: CARD_BG_COLOR, //
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent', // 기본 테두리 투명
    padding: 10,
  },
  selectedCard: {
    borderColor: ACCENT_COLOR, // 선택 시 보라색 테두리
    backgroundColor: `${ACCENT_COLOR}15`, // 선택 시 배경에 약간의 보라색 틴트 추가 (옵션)
  },
  cardLabel: {
    color: TEXT_COLOR,
    marginTop: 16,
    fontSize: 15,
    fontWeight: '600',
  },
  selectedLabel: {
    color: ACCENT_COLOR, // 선택 시 텍스트 색상 변경
  },

  // 활동 선택 카드 스타일
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BG_COLOR, //
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: 15,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#25253A', // 아이콘 배경색 (카드색보다 약간 밝게)
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  activityLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: TEXT_COLOR,
  },
});