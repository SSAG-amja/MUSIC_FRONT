// app/index.tsx
// 260130 임재준
// 기존 로그인 로직은 (auth)/signin.tsx로 이동
// index.tsx파일은 로딩 및 문지기 역할만 수행
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useRouter, useRootNavigationState } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

// ✅ [추가] API 호출을 위해 BASE_URL 임포트
import { BASE_URL } from '@/constants/Urls';

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
          // ✅ [수정] 토큰이 있다고 바로 메인으로 가지 않고, 유저 상태(is_newer)를 확인
          console.log("🎟️ 토큰 발견! 유저 상태 확인 중...");
          
          const response = await fetch(`${BASE_URL}/api/v1/users/me`, {
             headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (response.ok) {
            const userData = await response.json();
            
            if (userData.is_newer) {
              console.log("👶 신규 유저 발견 -> 온보딩으로 이동");
              router.replace('/onboarding'); 
            } else {
              console.log("😎 기존 유저 -> 메인으로 이동");
              router.replace('/(tabs)'); 
            }
          } else {
            // 토큰은 있는데 유효하지 않은 경우 (만료 등)
            console.log("🔒 유효하지 않은 토큰 -> 로그인 화면으로");
            router.replace('/signin');
          }
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