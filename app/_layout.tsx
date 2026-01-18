// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        
        {/* 260116임재준 초기화면 index로 수정 */}
        <Stack.Screen name="index" /> 

        
        
        {/* 1. 탭 화면들 */}
        <Stack.Screen name="(tabs)" />
        {/* 2. 로그인 화면들 */}
        <Stack.Screen name="(auth)" />
        {/* 260117임재준 온보딩 화면(헤더 숨기고,뒤로가기 방지*/}
        <Stack.Screen
          name="onboarding"
          options={{gestureEnabled:false}}
        />
        

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
        
        <Stack.Screen 
        name="useredit" 
        options={{ 
          headerShown: false, // useredit.tsx 내부에서 헤더를 그리지 않는다면 false, 그린다면 true 
          // (작성해주신 useredit.tsx 코드는 내부에 자체 헤더 설정을 가지고 있으므로 
          //  보통 여기서 headerShown: true로 하고 내부에서 커스텀하거나, 
          //  여기서 false로 하고 파일 안에서 UI를 그릴 수 있습니다.)
          //  작성해주신 코드는 <Stack.Screen options=... />를 내부에 가지고 있으므로
          //  여기서는 특별한 옵션 없이 등록만 해도 됩니다.
        }} 
      />
      </Stack>
    </>
  );
}