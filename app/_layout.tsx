// app/_layout.tsx (위치 확인 필수!)
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* 1. 탭 화면들 */}
        <Stack.Screen name="(tabs)" />
        
        {/* 2. 로그인 화면들 */}
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="index" />

        {/* 3. [필수] 프로필 수정 화면 등록 */}
        <Stack.Screen 
          name="profile-edit" 
          options={{ 
            headerShown: true, 
            title: '프로필 편집',
            presentation: 'modal',
            headerStyle: { backgroundColor: '#0A0A1E' },
            headerTintColor: '#fff',
          }} 
        />
      </Stack>
    </>
  );
}