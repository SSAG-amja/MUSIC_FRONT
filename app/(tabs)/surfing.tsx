import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function SurfingScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Surfing 🏄</Text>
        <Text style={styles.subtitle}>새로운 음악의 파도를 타보세요</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 맞춤 추천</Text>
        <Text style={styles.description}>
          나와 비슷한 연령대의 사용자가{"\n"}
          비 오는 날 자주 듣는 플레이리스트
        </Text>
        
        {/* 추천 콘텐츠 카드 */}
        <View style={styles.card}>
          <View style={styles.cardIcon}>
            <Text style={{fontSize: 40}}>☔</Text>
          </View>
          <View>
            <Text style={styles.cardTitle}>Rainy Day Jazz</Text>
            <Text style={styles.cardSubtitle}>차분한 분위기의 재즈 모음</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔥 실시간 트렌드</Text>
        <TouchableOpacity style={styles.trendItem}>
          <Text style={styles.trendText}>#코딩할때_듣는_노래</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.trendItem}>
          <Text style={styles.trendText}>#새벽감성</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff', paddingTop: 60 },
  header: { marginBottom: 30 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { fontSize: 16, color: 'gray' },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  description: { fontSize: 15, color: '#555', marginBottom: 15, lineHeight: 22 },
  card: { 
    flexDirection: 'row', alignItems: 'center', 
    backgroundColor: '#f0f4ff', padding: 20, borderRadius: 15,
    borderWidth: 1, borderColor: '#e0e0e0'
  },
  cardIcon: { marginRight: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardSubtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  trendItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  trendText: { fontSize: 16, color: '#333' }
});