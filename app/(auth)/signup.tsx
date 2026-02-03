import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
// 260130 임재준
//안전한 영역(노치 등) 높이를 계산해주는 훅 가져오기
import { useSafeAreaInsets } from 'react-native-safe-area-context';
//서버 주소 가져오기
import { BASE_URL } from '@/constants/Urls';

interface RadioButtonProps {
  label: string;
  value: string;
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function SignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //260203 임재준
  // Picker용 배열 생성 로직(useMemo) 삭제
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [gender, setGender] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    // 1. 유효성 검사
    if (!email || !nickname || !password || !confirmPassword || !year || !month || !day || !gender) {
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
    //260203 임재준
    // 간단한 날짜 유효성 체크
    const y = parseInt(year, 10);
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    if (y < 1900 || y > new Date().getFullYear() || m < 1 || m > 12 || d < 1 || d > 31) {
        Alert.alert('오류', '올바른 생년월일을 입력해주세요.');
        return;
    }

    // 데이터 가공 (padStart로 1 -> 01 변환 유지)
    const birthString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    
    const signupData = {
      email: email,
      username: nickname,
      gender: gender,
      birth: birthString,
      password: password
    };

    setLoading(true);
    console.log("🚀 [1단계] 요청 시작!");

    try {
      const TARGET_URL = `${BASE_URL}/api/v1/users/`;
      console.log(`📡 [2단계] 페치 시도: ${TARGET_URL}`);

      const response = await fetch(TARGET_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      console.log("✅ [3단계] 응답 도착! 상태코드:", response.status);

      const data = await response.json();

      if (response.ok) {
        Alert.alert('환영합니다!', '회원가입이 완료되었습니다.', [
          { text: '로그인하러 가기', onPress: () => router.back() },
        ]);
      } else {
        console.log("🔥 서버 에러 응답:", data);
        const errorMessage = typeof data.detail === 'string' ? data.detail : '입력 정보를 다시 확인해주세요.';
        Alert.alert('회원가입 실패', errorMessage);
      }
    } catch (error) {
      console.error("❌ [에러 발생]:", error);
      Alert.alert('연결 실패', `에러 내용: ${error}`);
    } finally {
      setLoading(false);
      console.log("🏁 [4단계] 로딩 종료");
    }
  };

  const RadioButton = ({ label, value, selectedValue, onSelect }: RadioButtonProps) => (
    <TouchableOpacity 
      style={styles.radioContainer} 
      onPress={() => onSelect(value)}
      activeOpacity={0.8}
    >
      <View style={[styles.radioCircle, selectedValue === value && styles.radioCircleSelected]}>
        {selectedValue === value && <View style={styles.radioInnerCircle} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar style="light" />
      <Stack.Screen 
        options={{ 
          title: '', 
          headerBackTitle: ' ', 
          headerTintColor: '#FFFFFF', 
          headerStyle: { backgroundColor: '#0A0A1E' }, 
          headerShadowVisible: false, 
        }} 
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={[
            styles.scrollContainer, 
            { paddingTop: insets.top + 20 } // (기기 노치 높이) + (여유 공간 20)
          ]}
        >
          
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>새 계정 만들기</Text>
            <Text style={styles.headerSubtitle}>나만의 감성 음악 일기를 시작해보세요</Text>
          </View>

          <View style={styles.inputContainer}>
            {/* 이메일 */}
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

            {/* 닉네임 */}
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
            {/*260203 임재준 */}
            {/* 생년월일 (Picker -> TextInput 변경됨) */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>생년월일</Text>
              <View style={styles.datePickerRow}>
                {/* 년 */}
                <TextInput
                  style={[styles.input, { flex: 1.2, textAlign: 'center' }]}
                  placeholder="YYYY"
                  placeholderTextColor="#888899"
                  value={year}
                  onChangeText={setYear}
                  keyboardType="number-pad"
                  maxLength={4}
                  returnKeyType="next"
                />
                
                {/* 월 */}
                <TextInput
                  style={[styles.input, { flex: 1, textAlign: 'center' }]}
                  placeholder="MM"
                  placeholderTextColor="#888899"
                  value={month}
                  onChangeText={setMonth}
                  keyboardType="number-pad"
                  maxLength={2}
                  returnKeyType="next"
                />

                {/* 일 */}
                <TextInput
                  style={[styles.input, { flex: 1, textAlign: 'center' }]}
                  placeholder="DD"
                  placeholderTextColor="#888899"
                  value={day}
                  onChangeText={setDay}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>
            </View>

            {/* 성별 */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>성별</Text>
              <View style={styles.radioGroup}>
                <RadioButton label="남성" value="male" selectedValue={gender} onSelect={setGender} />
                <RadioButton label="여성" value="female" selectedValue={gender} onSelect={setGender} />
                <RadioButton label="기타" value="other" selectedValue={gender} onSelect={setGender} />
              </View>
            </View>

            {/* 비밀번호 */}
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

            {/* 비밀번호 확인 */}
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

          {/* 가입 완료 버튼 */}
          <TouchableOpacity 
            style={[styles.signupButton, loading && { opacity: 0.7 }]} 
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.signupButtonText}>가입 완료</Text>
            )}
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1E',
  },
  scrollContainer: {
    padding: 30,
    paddingBottom: 50,
  },
  headerContainer: {
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#888899',
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 30,
    gap: 20,
  },
  inputWrapper: {
    gap: 8,
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
  // --- 생년월일 스타일 (Picker 관련 스타일 제거됨) ---
  datePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  // pickerContainer 및 picker 스타일 삭제됨
  
  // --- 성별 라디오 버튼 스타일 ---
  radioGroup: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 5,
    paddingLeft: 4,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#8A2BE2',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F1F35',
  },
  radioCircleSelected: {
    borderColor: '#8A2BE2',
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#8A2BE2',
  },
  radioLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  // --- 버튼 스타일 ---
  signupButton: {
    height: 55,
    backgroundColor: '#8A2BE2',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#8A2BE2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 10,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});