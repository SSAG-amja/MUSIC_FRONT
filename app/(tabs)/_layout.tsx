import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// 디자인 상수 (이전과 동일)
const BG_COLOR = '#0A0A1A';
const ACCENT_COLOR = '#7F56D9';
const INACTIVE_COLOR = '#9A9AB0';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
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

      {/* 5. 내정보 (탭바에서 숨김 처리) */}
      <Tabs.Screen
        name="user"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}