import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WeatherBackground from '@/components/WeatherBackground';

/* ───── 컬러 상수 ───── */
const BG_COLOR = '#0A0A1A';
const CARD_BG_COLOR = '#14142B';
const TEXT_COLOR = '#FFFFFF';
const ACCENT_COLOR = '#7F56D9';
const SUB_TEXT_COLOR = '#9A9AB0';

export default function HomeScreen() {
  const [location] = useState('Seoul, South Korea');
  const [weather] = useState('Rainy');

  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const generatePlaylist = () => {
    if (!selectedMood || !selectedActivity) return;

    console.log({
      mood: selectedMood,
      activity: selectedActivity,
    });

    Alert.alert(
      'Playlist Created 🎧',
      `Mood: ${selectedMood}\nActivity: ${selectedActivity}`
    );
  };

  const moods = [
    { id: 'positive', label: 'Positive', icon: 'happy-outline' },
    { id: 'negative', label: 'Negative', icon: 'sad-outline' },
    { id: 'calm', label: 'Calm', icon: 'leaf-outline' },
    { id: 'energetic', label: 'Energetic', icon: 'flash-outline' },
    { id: 'anxious', label: 'Anxious', icon: 'alert-circle-outline' },
  ];

  const activities = [
    { id: 'work', label: 'Work', icon: 'briefcase-outline' },
    { id: 'study', label: 'Study', icon: 'book-outline' },
    { id: 'commute', label: 'Commute', icon: 'train-outline' },
    { id: 'relax', label: 'Relax', icon: 'cafe-outline' },
    { id: 'exercise', label: 'Exercise', icon: 'barbell-outline' },
    { id: 'social', label: 'Social', icon: 'people-outline' },
  ];

  const isSubmitEnabled = selectedMood && selectedActivity;

  return (
    <View style={{ flex: 1, backgroundColor: BG_COLOR }}>
      <WeatherBackground weather={weather} />

      <ScrollView
        contentContainerStyle={styles.container}
        style={{ zIndex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ───── 상단 위치 / 날씨 ───── */}
        <View style={styles.topHeader}>
          <View>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={18} color={SUB_TEXT_COLOR} />
              <Text style={styles.locationText}>{location}</Text>
            </View>
            <View style={styles.weatherRow}>
              <Ionicons name="rainy-outline" size={18} color={SUB_TEXT_COLOR} />
              <Text style={styles.weatherText}>{weather}</Text>
            </View>
          </View>
        </View>

        {/* ───── 타이틀 ───── */}
        <View style={styles.header}>
          <Text style={styles.title}>
            What's your{'\n'}
            <Text style={styles.highlightText}>atmosphere</Text> today?
          </Text>
          <Text style={styles.subtitle}>
            Let AI curate the perfect soundtrack for your moment
          </Text>
        </View>

        {/* ───── 기분 선택 ───── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How are you feeling?</Text>
          <Text style={styles.sectionSubtitle}>Select your current mood</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.moodScroll}
          >
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood.id}
                style={[
                  styles.moodCard,
                  selectedMood === mood.id && styles.selectedCard,
                ]}
                onPress={() => setSelectedMood(mood.id)}
                activeOpacity={0.85}
              >
                <Ionicons
                  name={mood.icon as any}
                  size={32}
                  color={selectedMood === mood.id ? ACCENT_COLOR : TEXT_COLOR}
                />
                <Text
                  style={[
                    styles.cardLabel,
                    selectedMood === mood.id && styles.selectedLabel,
                  ]}
                >
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ───── 활동 선택 ───── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What are you doing?</Text>
          <Text style={styles.sectionSubtitle}>Choose your current activity</Text>

          {activities.map((act) => (
            <TouchableOpacity
              key={act.id}
              style={[
                styles.activityCard,
                selectedActivity === act.id && styles.selectedCard,
              ]}
              onPress={() => setSelectedActivity(act.id)}
              activeOpacity={0.85}
            >
              <View style={styles.iconCircle}>
                <Ionicons name={act.icon as any} size={24} color={TEXT_COLOR} />
              </View>
              <Text style={styles.activityLabel}>{act.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ───── 맨 아래 Create Playlist 버튼 ───── */}
        <View style={styles.submitSection}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              !isSubmitEnabled && styles.submitButtonDisabled,
            ]}
            disabled={!isSubmitEnabled}
            onPress={generatePlaylist}
            activeOpacity={0.9}
          >
            <Text style={styles.submitButtonText}>
              Create Playlist
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

/* ───── 스타일 ───── */
const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 48, // 자연스러운 하단 여백
  },

  topHeader: {
    marginBottom: 32,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  locationText: {
    color: SUB_TEXT_COLOR,
    marginLeft: 8,
    fontSize: 14,
  },
  weatherText: {
    color: SUB_TEXT_COLOR,
    marginLeft: 8,
    fontSize: 14,
  },

  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: TEXT_COLOR,
    lineHeight: 42,
  },
  highlightText: {
    color: ACCENT_COLOR,
  },
  subtitle: {
    fontSize: 16,
    color: SUB_TEXT_COLOR,
    marginTop: 12,
  },

  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: TEXT_COLOR,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: SUB_TEXT_COLOR,
    marginBottom: 20,
  },

  moodScroll: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: 16,
  },
  moodCard: {
    width: 120,
    height: 140,
    backgroundColor: CARD_BG_COLOR,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardLabel: {
    color: TEXT_COLOR,
    marginTop: 16,
    fontSize: 15,
    fontWeight: '600',
  },
  selectedCard: {
    borderColor: ACCENT_COLOR,
    backgroundColor: `${ACCENT_COLOR}15`,
  },
  selectedLabel: {
    color: ACCENT_COLOR,
  },

  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BG_COLOR,
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
    backgroundColor: '#25253A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  activityLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: TEXT_COLOR,
  },

  submitSection: {
    marginTop: 24,
  },
  submitButton: {
    height: 60,
    borderRadius: 30,
    backgroundColor: ACCENT_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#3A3A55',
  },
  submitButtonText: {
    color: TEXT_COLOR,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
