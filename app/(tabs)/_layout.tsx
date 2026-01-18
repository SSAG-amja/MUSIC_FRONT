import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import MusicBar from '@/components/MusicBar';
import MusicSheet from '@/components/MusicSheet';

// 디자인 상수
const BG_COLOR = '#0A0A1A';
const ACCENT_COLOR = '#7F56D9';
const INACTIVE_COLOR = '#9A9AB0';

export default function TabLayout() {
  const router = useRouter();

  // 🔥 임시 상태 (나중에 전역 플레이어 상태로 교체)
  const [isPlaying] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);

  // 헤더 우측 아이콘 (검색 / 유저)
  const HeaderRightIcons = () => (
    <View style={styles.headerRightContainer}>
      <TouchableOpacity onPress={() => console.log('검색 클릭')}>
        <Ionicons name="search" size={24} color="#FFF" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(tabs)/user')}>
        <Ionicons name="person-circle-outline" size={26} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* ───── Tabs (기존 네비게이션 그대로) ───── */}
      <Tabs
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: BG_COLOR,
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerRight: () => <HeaderRightIcons />,

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
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="album"
          options={{
            title: 'Album',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="albums" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="diary"
          options={{
            title: 'Diary',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="surfing"
          options={{
            title: 'Surfing',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="compass" size={size} color={color} />
            ),
          }}
        />

        {/* 탭바에서 숨김 */}
        <Tabs.Screen
          name="user"
          options={{
            href: null,
            title: 'My Profile',
          }}
        />
      </Tabs>

      {/* ───── Mini Player (탭바 바로 위) ───── */}
      <MusicBar
        isPlaying={isPlaying}
        onOpen={() => setSheetOpen(true)}
      />

      {/* ───── Full Player Sheet (아래→위 애니메이션) ───── */}
      <MusicSheet
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingRight: 20,
  },
});
