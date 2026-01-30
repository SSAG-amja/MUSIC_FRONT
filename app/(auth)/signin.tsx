// app/(auth)/signin.tsx
//260130 임재준
//라우팅 편의성을 위하여 기존 로그인화면이었던 index.tsx
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from '@/constants/Urls';

export default function SignInScreen() {
  const router = useRouter();
  const [id, setId] = useState(''); 
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (id === '' || password === '') {
      Alert.alert('알림', '아이디와 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    console.log("🚀 로그인 요청 시작:", id);

    try {
      const TARGET_URL = `${BASE_URL}/api/v1/login`;
      
      const formData = new URLSearchParams();
      formData.append('username', id); 
      formData.append('password', password);

      const response = await fetch(TARGET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('🎉 로그인 성공!');
        await SecureStore.setItemAsync('userToken', data.access_token);
        
        // 로그인 성공 시 메인 탭으로 이동
        router.replace('/(tabs)'); 
      } else {
        Alert.alert('로그인 실패', '아이디 또는 비밀번호를 확인해주세요.');
      }
    } catch (error) {
      console.error("❌ 에러:", error);
      Alert.alert('연결 오류', '서버와 통신할 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Music Match</Text>
            <Text style={styles.subtitle}>다시 오신 것을 환영합니다!</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>아이디 (이메일)</Text>
              <TextInput
                style={styles.input}
                placeholder="example@email.com"
                placeholderTextColor="#888899"
                value={id}
                onChangeText={setId}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>비밀번호</Text>
              <TextInput
                style={styles.input}
                placeholder="비밀번호 입력"
                placeholderTextColor="#888899"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.loginButton, loading && { opacity: 0.7 }]} 
            onPress={handleLogin}
            disabled={loading}
          >
             {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>로그인</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>아직 계정이 없으신가요? </Text>
            {/* 같은 (auth) 폴더 안이라서 경로가 간단해집니다 */}
            <Link href="/signup" asChild> 
              <TouchableOpacity>
                <Text style={styles.signupLink}>회원가입</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A1E' },
  innerContainer: { flex: 1, justifyContent: 'center', paddingHorizontal: 30 },
  titleContainer: { marginBottom: 50, alignItems: 'center' },
  title: { fontSize: 36, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#888899', textAlign: 'center' },
  inputContainer: { gap: 20, marginBottom: 40 },
  inputWrapper: { gap: 8 },
  label: { fontSize: 14, color: '#FFFFFF', marginLeft: 4, fontWeight: '600' },
  input: { height: 55, backgroundColor: '#1F1F35', borderRadius: 12, paddingHorizontal: 20, fontSize: 16, color: '#FFFFFF', borderWidth: 1, borderColor: '#2F2F4F' },
  loginButton: { height: 55, backgroundColor: '#8A2BE2', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 25 },
  loginButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  footerContainer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: '#888899', fontSize: 15 },
  signupLink: { color: '#8A2BE2', fontSize: 15, fontWeight: 'bold' },
});