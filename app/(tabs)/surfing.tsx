import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/* ───── 디자인 상수 (Home / Diary / Album과 통일) ───── */
const COLORS = {
  background: '#0A0A1E',
  card: '#111122',
  accent: '#8A2BE2',
  textPrimary: '#FFFFFF',
  textSecondary: '#888899',
};

export default function SurfingScreen() {
  return (
    /* 🔥 Home과 동일한 구조: 뒤 배경 + ScrollView */
    <View style={styles.screen}>
      <View style={styles.backgroundLayer} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* ───── 상단 설명 문구 (페이지명 제거) ───── */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Discover playlists and songs loved by people like you
          </Text>
        </View>

        {/* ───── 맞춤 추천 ───── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>For You</Text>
          <Text style={styles.description}>
            People in your age group often listen to these playlists{"\n"}
            on rainy days
          </Text>

          <TouchableOpacity style={styles.recommendCard} activeOpacity={0.9}>
            <View style={styles.iconCircle}>
              <Ionicons
                name="rainy-outline"
                size={26}
                color={COLORS.accent}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Rainy Day Jazz</Text>
              <Text style={styles.cardSubtitle}>
                Calm jazz playlists loved by people like you
              </Text>

              <View style={styles.tagsRow}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Rainy</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Calm</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>20s</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* ───── 비슷한 사람들이 듣는 곡 ───── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>People Like You</Text>

          <View style={styles.songCard}>
            <Text style={styles.songTitle}>Midnight Rain</Text>
            <Text style={styles.songArtist}>Taylor Swift</Text>
            <Text style={styles.songMeta}>Calm · Rainy · Working</Text>
          </View>

          <View style={styles.songCard}>
            <Text style={styles.songTitle}>Nights</Text>
            <Text style={styles.songArtist}>Frank Ocean</Text>
            <Text style={styles.songMeta}>Late Night · Melancholy</Text>
          </View>
        </View>

        {/* ───── 트렌드 ───── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending</Text>

          <View style={styles.trendRow}>
            {[
              '#코딩할때_듣는_노래',
              '#새벽감성',
              '#비오는날',
              '#집중플레이리스트',
            ].map((tag) => (
              <TouchableOpacity key={tag} style={styles.trendTag}>
                <Text style={styles.trendText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

/* ───── 스타일 ───── */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* bounce 시 노출되는 배경 */
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.background,
  },

  container: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 48,
  },

  /* 상단 설명 */
  header: {
    marginBottom: 32,
  },
  headerText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },

  section: {
    marginBottom: 36,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },

  /* 추천 카드 */
  recommendCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 24,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(138, 43, 226, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
    marginBottom: 10,
  },

  tagsRow: {
    flexDirection: 'row',
    gap: 8,
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

  /* 곡 카드 */
  songCard: {
    backgroundColor: COLORS.card,
    padding: 18,
    borderRadius: 20,
    marginBottom: 14,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  songArtist: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  songMeta: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 6,
  },

  /* 트렌드 */
  trendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  trendTag: {
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  trendText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
});
