import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 파일에 따라 함수 이름을 바꾸세요: AlbumScreen, SurfingScreen, UserScreen
export default function AlbumScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>페이지 준비중입니다...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 18, color: '#555' },
});