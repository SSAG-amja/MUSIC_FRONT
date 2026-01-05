import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (id === '' || password === '') {
      Alert.alert('알림', '아이디와 비밀번호를 입력해주세요.');
      return;
    }
    // TODO: 실제 로그인 API 호출
    console.log('로그인 시도:', id, password);
    router.replace('/(tabs)'); 
  };

  return (
    <>
      <StatusBar style="light" /> {/* 상태바 아이콘을 흰색으로 */}
      
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
  container: {
    flex: 1,
    backgroundColor: '#0A0A1E', // 메인 어두운 배경색
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
    color: '#FFFFFF', // 흰색 타이틀
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#888899', // 보조 텍스트 색상
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
    backgroundColor: '#1F1F35', // 어두운 컨테이너 배경색
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#FFFFFF', // 입력 텍스트 흰색
    borderWidth: 1,
    borderColor: '#2F2F4F', // 은은한 테두리
  },
  loginButton: {
    height: 55,
    backgroundColor: '#8A2BE2', // 액센트 보라색
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    // 네온 느낌의 그림자
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
    color: '#8A2BE2', // 링크도 액센트 색상으로
    fontSize: 15,
    fontWeight: 'bold',
  },
});