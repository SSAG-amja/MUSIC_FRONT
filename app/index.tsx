// app/index.tsx
//260130 임재준
//기존 로그인 로직은 (auth)/signin.tsx로 이동
//index.tsx파일은 로딩 및 문지기 역할만 수행
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useRouter, useRootNavigationState } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function SplashScreen() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const [isReady, setIsReady] = useState(false);

  // 1. 네비게이션 준비
  useEffect(() => {
    if (rootNavigationState?.key) setIsReady(true);
  }, [rootNavigationState?.key]);

  // 2. 토큰 검사 및 이동
  useEffect(() => {
    if (!isReady) return;

    const checkToken = async () => {
      try {
        // 1초 정도 로고 보여주는 척 대기 (UX)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const token = await SecureStore.getItemAsync('userToken');
        
        if (token) {
          console.log("🎟️ 자동 로그인 -> 메인으로");
          router.replace('/(tabs)'); 
        } else {
          console.log("🔒 토큰 없음 -> 로그인 화면으로");
          // (auth) 그룹 폴더는 주소에 포함되지 않으므로 그냥 /signin 입니다.
          router.replace('/signin'); 
        }
      } catch (e) {
        console.error(e);
        router.replace('/signin');
      }
    };

    checkToken();
  }, [isReady]);

  return (
    <View style={styles.container}>
      {/* 여기에 앱 로고 이미지를 넣으면 더 좋습니다 */}
      <Text style={styles.logoText}>Music Match</Text>
      <ActivityIndicator size="large" color="#8A2BE2" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});