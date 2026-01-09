import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* login은 지웠으니 등록 안 해도 됩니다. */}
      {/* signup만 등록하면 에러가 사라집니다. */}
      <Stack.Screen name="signup" /> 
    </Stack>
  );
}