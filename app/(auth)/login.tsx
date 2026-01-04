import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  
  const handleSocialLogin = (platform: string) => {
    console.log(`${platform} 로그인 시도`);
    // 로그인 성공 시 탭 화면으로 이동 (뒤로가기 방지: replace)
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music AI</Text>
      <Text style={styles.subtitle}>당신의 감정을 연주합니다</Text>

      <TouchableOpacity style={[styles.btn, {backgroundColor: '#FAE100'}]} onPress={() => handleSocialLogin('Kakao')}>
        <Text style={styles.btnTextBlack}>카카오로 시작하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, {backgroundColor: '#DB4437'}]} onPress={() => handleSocialLogin('Google')}>
        <Text style={styles.btnTextWhite}>Google로 시작하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, {backgroundColor: '#000000'}]} onPress={() => handleSocialLogin('Apple')}>
        <Text style={styles.btnTextWhite}>Apple로 시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: 'white' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: 'gray', marginBottom: 50 },
  btn: { width: '100%', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  btnTextWhite: { color: 'white', fontWeight: '600' },
  btnTextBlack: { color: 'black', fontWeight: '600' },
});