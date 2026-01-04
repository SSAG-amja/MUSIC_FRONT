import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

interface DiaryEntry {
  id: string;
  date: string;
  location: string;
  song: string;
  memo: string;
}

const mockDiaries: DiaryEntry[] = [
  { id: '1', date: '2024-01-04', location: '한강 공원', song: 'Autumn Leaves', memo: '노을 보면서...' },
  { id: '2', date: '2024-01-03', location: '학교 도서관', song: 'Lofi Hip Hop', memo: '공부 집중...' },
];

export default function DiaryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>음악 일기장 📖</Text>
      <FlatList 
        data={mockDiaries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </View>
            <Text style={styles.song}>🎵 {item.song}</Text>
            <Text style={styles.memo}>{item.memo}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.fab}><Text style={styles.fabText}>+</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#eee' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  date: { color: '#888', fontSize: 12 },
  location: { color: '#888', fontSize: 12 },
  song: { fontSize: 16, fontWeight: 'bold', marginVertical: 5 },
  memo: { fontSize: 14, color: '#333' },
  fab: { position: 'absolute', right: 20, bottom: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: '#6200ea', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  fabText: { color: 'white', fontSize: 24 }
});