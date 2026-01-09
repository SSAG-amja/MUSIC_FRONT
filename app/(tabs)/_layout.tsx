import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router'; // useRouter 추가
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native'; // View, TouchableOpacity 추가

// 디자인 상수
const BG_COLOR = '#0A0A1A';
const ACCENT_COLOR = '#7F56D9';
const INACTIVE_COLOR = '#9A9AB0';

export default function TabLayout() {
  const router = useRouter(); // 네비게이션을 위해 훅 사용

  // 상단 헤더 우측 버튼 컴포넌트 (검색 + 유저)
  const HeaderRightIcons = () => (
    <View style={styles.headerRightContainer}>
      {/* 1. 검색 버튼 */}
      <TouchableOpacity onPress={() => console.log('검색 클릭')}>
        <Ionicons name="search" size={24} color="#FFF" />
      </TouchableOpacity>

      {/* 2. 유저 버튼 -> user.tsx 화면으로 이동 */}
      <TouchableOpacity onPress={() => router.push('/(tabs)/user')}>
        <Ionicons name="person-circle-outline" size={26} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        // [중요] 헤더를 보이게 설정 (기본값 false -> true)
        headerShown: true,
        
        // 헤더 스타일링 (다크 테마 적용)
        headerStyle: {
          backgroundColor: BG_COLOR,
          borderBottomWidth: 0, // 헤더 하단 선 제거 (깔끔하게)
          elevation: 0, // 안드로이드 그림자 제거
          shadowOpacity: 0, // iOS 그림자 제거
        },
        headerTintColor: '#FFF', // 헤더 제목(Title) 색상 흰색
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },

        // [핵심] 헤더 우측에 아이콘 배치
        headerRight: () => <HeaderRightIcons />,

        // 탭바 스타일링 (기존 유지)
        tabBarActiveTintColor: ACCENT_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarStyle: {
          backgroundColor: BG_COLOR,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      {/* 1. 홈 (Home) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />

      {/* 2. 앨범 (Album) */}
      <Tabs.Screen
        name="album"
        options={{
          title: 'Album',
          tabBarIcon: ({ color, size }) => <Ionicons name="albums" size={size} color={color} />,
        }}
      />

      {/* 3. 다이어리 (Diary) */}
      <Tabs.Screen
        name="diary"
        options={{
          title: 'Diary',
          tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} />,
        }}
      />

      {/* 4. 서핑 (Surfing) */}
      <Tabs.Screen
        name="surfing"
        options={{
          title: 'Surfing',
          tabBarIcon: ({ color, size }) => <Ionicons name="compass" size={size} color={color} />,
        }}
      />

      {/* 5. 내정보 (탭바에서 숨김 처리, 헤더는 다른 설정 가능) */}
      <Tabs.Screen
        name="user"
        options={{
          href: null,
          title: 'My Profile',
          // 유저 페이지에서는 우측 상단 버튼들을 숨기고 싶다면 아래 주석 해제
          // headerRight: () => null, 
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 15, // 아이콘 사이 간격
    paddingRight: 20 // 오른쪽 여백
  }
});