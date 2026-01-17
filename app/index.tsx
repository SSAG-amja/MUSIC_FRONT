import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  // 260117 임재준 온보딩 분기 설정
  // [수정] 입력값 비교를 좀 더 안전하게 처리하도록 변경
  const mockLoginApi = async (userId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // .trim()을 사용하여 앞뒤 공백 제거 후 비교 (모바일에서 공백 실수 방지)
        // .toLowerCase()를 사용하여 대소문자 무시 (선택사항)
        if (userId.trim().toLowerCase() === 'new') {
          // 'new' -> 아직 온보딩 안 함 (false)
          resolve({ success: true, token: 'abc', hasOnboarded: false });
        } else {
          // 그 외 -> 이미 온보딩 완료함 (true)
          resolve({ success: true, token: 'abc', hasOnboarded: true });
        }
      }, 1000); // 1초 딜레이
    });
  };

  const handleLogin = async () => {
    if (id === '' || password === '') {
      Alert.alert('알림', '아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      console.log(`로그인 시도 ID: '${id}'`); // 공백이 포함되어 있는지 확인용

      // 1. [API 호출]
      const response: any = await mockLoginApi(id); 
      
      console.log('서버 응답:', response); // [디버깅] 서버가 실제로 뭘 줬는지 확인

      if (response.success) {
        // 2. [토큰 저장] (생략)
        
        // 3. [분기 처리]
        // hasOnboarded가 true면 메인, false면 온보딩
        if (response.hasOnboarded === true) {
          console.log('✅ 기존 유저(true) -> 메인 탭으로 이동');
          router.replace('/(tabs)'); 
        } else {
          console.log('🆕 신규 유저(false) -> 온보딩 화면으로 이동');
          router.replace('/onboarding'); 
        }
      } else {
        Alert.alert('오류', '로그인 정보가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '서버 통신 중 문제가 발생했습니다.');
    }
    // [주의] 이 아래에 router.replace 코드가 절대 있으면 안 됩니다!
  };

  return (
    <>
      <StatusBar style="light" /> 
      {/* ... (UI 코드는 기존과 동일하여 생략, 그대로 두시면 됩니다) ... */}
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
              <Text style={styles.label}>아이디</Text>
              <TextInput
                style={styles.input}
                placeholder="이메일 주소 입력"
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

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>아직 계정이 없으신가요? </Text>
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
  // ... (기존 스타일 유지) ...
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