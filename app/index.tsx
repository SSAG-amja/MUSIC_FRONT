import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';

// 1. BASE_URL 가져오기 (디버깅용 로그 추가)
import { BASE_URL } from '@/constants/Urls';
console.log("🧐 현재 적용된 BASE_URL:", BASE_URL);
//220122 암재준
//백엔드 연결
export default function LoginScreen() {
  const router = useRouter();
  const [id, setId] = useState(''); // 이메일
  const [password, setPassword] = useState('');
  
  // 2. 로딩 상태 추가
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (id === '' || password === '') {
      Alert.alert('알림', '아이디와 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true); // 로딩 시작
    
    // 👇 [디버깅] 1단계 로그
    console.log("🚀 [1단계] 로그인 요청 시작! ID:", id);

    try {
      // ⚠️ Signup과 동일하게 IP를 직접 입력해서 확실하게 연결합니다.
      // 나중에 BASE_URL 설정이 확실해지면 교체하세요.
      const TARGET_URL = `${BASE_URL}/api/v1/login`;
      
      console.log(`📡 [2단계] 페치 시도: ${TARGET_URL}`);

      // 3. FastAPI 로그인 표준: Form Data 생성
      const formData = new URLSearchParams();
      formData.append('username', id); 
      formData.append('password', password);

      const response = await fetch(TARGET_URL, {
        method: 'POST',
        headers: {
          // 중요: 로그인은 JSON 아님! (x-www-form-urlencoded)
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      // 👇 [디버깅] 3단계 로그
      console.log("✅ [3단계] 응답 도착! 상태코드:", response.status);

      const data = await response.json();

      if (response.ok) {
        console.log('🎉 로그인 성공! 받은 토큰:', data.access_token);
        
        // TODO: 여기서 받은 토큰(data.access_token)을 저장해야 합니다. (AsyncStorage 등)
        
        // 메인 화면으로 이동
        router.replace('/(tabs)'); 
      } else {
        console.log("🔥 로그인 실패 응답:", data);
        Alert.alert('로그인 실패', '아이디 또는 비밀번호를 확인해주세요.');
      }
    } catch (error) {
      console.error("❌ [에러 발생]:", error);
      Alert.alert('연결 오류', '서버와 통신할 수 없습니다.');
    } finally {
      setLoading(false); // 로딩 끝
      console.log("🏁 [4단계] 로딩 종료");
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
            <Text style={styles.subtitle}>당신의 분위기를 음악으로 들려드릴게요</Text>
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
            {/* 파일 구조에 맞춰 경로 설정 */}
            <Link href="/(auth)/signup" asChild> 
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
  container: {
    flex: 1,
    backgroundColor: '#0A0A1E',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  titleContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#888899',
    textAlign: 'center',
  },
  inputContainer: {
    gap: 20,
    marginBottom: 40,
  },
  inputWrapper: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
    fontWeight: '600',
  },
  input: {
    height: 55,
    backgroundColor: '#1F1F35',
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2F2F4F',
  },
  loginButton: {
    height: 55,
    backgroundColor: '#8A2BE2',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: "#8A2BE2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5, 
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#888899',
    fontSize: 15,
  },
  signupLink: {
    color: '#8A2BE2',
    fontSize: 15,
    fontWeight: 'bold',
  },
});