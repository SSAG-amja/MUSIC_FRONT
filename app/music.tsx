import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const COLORS = {
  background: '#0A0A1E',
  card: '#111122',
  textPrimary: '#FFFFFF',
  textSecondary: '#888899',
};

const mockQueue = [
  { id: '1', title: 'Midnight Rain', artist: 'Taylor Swift' },
  { id: '2', title: 'Nights', artist: 'Frank Ocean' },
  { id: '3', title: 'After Dark', artist: 'Drake' },
];

export default function MusicScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.headerText}>Now Playing</Text>

      <FlatList
        data={mockQueue}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.artist}>{item.artist}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  headerText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 20,
    marginBottom: 12,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  artist: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },
});
