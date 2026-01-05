import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    // (이전과 동일한 유효성 검사 로직...)
    if (!email || !nickname || !password || !confirmPassword) {
      Alert.alert('알림', '모든 정보를 입력해주세요.');
      return;
    }
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (password.length < 8 || !specialCharRegex.test(password)) {
      Alert.alert('비밀번호 오류', '비밀번호는 8자 이상이어야 하며,\n특수문자를 포함해야 합니다.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }

    console.log('회원가입 성공:', { email, nickname });
    Alert.alert('환영합니다!', '회원가입이 완료되었습니다.', [
      { text: '시작하기', onPress: () => router.back() },
    ]);
  };

  return (
    <>
      <StatusBar style="light" />
      {/* 헤더 스타일을 다크 테마에 맞게 설정 */}
      <Stack.Screen 
        options={{ 
          title: '', // 타이틀 비움
          headerBackTitle: ' ', // 뒤로가기 텍스트 제거 (화살표만 표시)
          headerTintColor: '#FFFFFF', // 뒤로가기 화살표 흰색
          headerStyle: { backgroundColor: '#0A0A1E' }, // 헤더 배경색 어둡게
          headerShadowVisible: false, // 헤더 그림자 제거
        }} 
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>새 계정 만들기</Text>
            <Text style={styles.headerSubtitle}>나만의 감성 음악 일기를 시작해보세요</Text>
          </View>

          <View style={styles.inputContainer}>
            {/* 입력창 스타일은 로그인 화면과 동일 */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>이메일</Text>
              <TextInput
                style={styles.input}
                placeholder="example@email.com"
                placeholderTextColor="#888899"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>닉네임</Text>
              <TextInput
                style={styles.input}
                placeholder="앱에서 사용할 이름"
                placeholderTextColor="#888899"
                value={nickname}
                onChangeText={setNickname}
                autoCorrect={false}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>비밀번호</Text>
              <TextInput
                style={styles.input}
                placeholder="8자 이상, 특수문자 포함"
                placeholderTextColor="#888899"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>비밀번호 확인</Text>
              <TextInput
                style={styles.input}
                placeholder="비밀번호 재입력"
                placeholderTextColor="#888899"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>가입 완료</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1E', // 메인 어두운 배경
  },
  scrollContainer: {
    padding: 30,
    paddingTop: 10,
  },
  headerContainer: {
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF', // 흰색 타이틀
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#888899',
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 40,
    gap: 25,
  },
  inputWrapper: {
    gap: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
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
  signupButton: {
    height: 55,
    backgroundColor: '#8A2BE2', // 액센트 보라색
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#8A2BE2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});