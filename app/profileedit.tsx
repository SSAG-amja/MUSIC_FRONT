import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react'; // ✅ useEffect 추가
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';

// ✅ 토큰 및 서버 주소 가져오기
import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from '@/constants/Urls';

export default function ProfileEditScreen() {
  const router = useRouter();

  // 상태 관리
  const [nickname, setNickname] = useState(''); 
  const [intro, setIntro] = useState('');
  const [loading, setLoading] = useState(true); // 로딩 상태

  // ✅ 1. 화면 진입 시 내 정보 불러오기
  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (!token) {
          Alert.alert("오류", "로그인 정보가 없습니다.");
          router.back();
          return;
        }

        // 내 정보 요청 (GET)
        const response = await fetch(`${BASE_URL}/api/v1/users/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log("📝 프로필 편집 - 불러온 데이터:", data);

          // (1) 닉네임 설정
          setNickname(data.username || data.full_name || ''); 
          
          // (2) 소개글 설정 (값이 없으면 디폴트 문구 사용)
          // 백엔드에 'intro' 필드가 있다고 가정 (없으면 undefined -> 디폴트값 적용됨)
          if (data.intro && data.intro.trim() !== '') {
            setIntro(data.intro);
          } else {
            setIntro('당신에 대하여 소개해주세요');
          }

        } else {
          Alert.alert("오류", "정보를 불러오지 못했습니다.");
        }
      } catch (error) {
        console.error("정보 로드 실패:", error);
      } finally {
        setLoading(false); // 로딩 끝
      }
    };

    fetchMyInfo();
  }, []);

  const handleSave = async () => {
    // 1. 유효성 검사
    if (!nickname.trim()) {
      Alert.alert('오류', '닉네임을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      const token = await SecureStore.getItemAsync('userToken');

      // 2. 백엔드 업데이트 요청 (PUT)
      // 실제 백엔드 API가 준비되면 이 주소와 필드명을 맞춰야 합니다.
      /*
      const response = await fetch(`${BASE_URL}/api/v1/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: nickname,
          intro: intro // 소개글도 같이 전송
        })
      });
      */

      // 👇 (지금은 백엔드 PUT이 없으니 콘솔만 찍고 성공 처리)
      console.log('💾 저장 요청 데이터:', { nickname, intro });
      
      // 가짜 딜레이 (사용자 경험용)
      await new Promise(resolve => setTimeout(resolve, 500));

      Alert.alert('완료', '프로필이 수정되었습니다.', [
        { text: '확인', onPress: () => router.back() } 
      ]);

    } catch (error) {
      console.error(error);
      Alert.alert('오류', '저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 로딩 중일 때 표시
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Stack.Screen options={{ title: '프로필 편집', headerStyle: { backgroundColor: '#0A0A1E' }, headerTintColor: '#fff' }}/>
        <ActivityIndicator size="large" color="#8A2BE2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 헤더 설정 */}
      <Stack.Screen 
        options={{
          title: '프로필 편집',
          headerStyle: { backgroundColor: '#0A0A1E' },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{ color: '#fff', fontSize: 16 }}>취소</Text>
            </TouchableOpacity>
          ),
        }} 
      />

      {/* 1. 프로필 사진 변경 (UI만 구현) */}
      <View style={styles.avatarSection}>
        <View style={styles.avatarPlaceholder}>
           <Ionicons name="person" size={40} color="#888" />
        </View>
        <TouchableOpacity>
          <Text style={styles.changePhotoText}>사진 변경</Text>
        </TouchableOpacity>
      </View>

      {/* 2. 닉네임 입력 */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>닉네임</Text>
        <TextInput 
          style={styles.input} 
          value={nickname} 
          onChangeText={setNickname}
          placeholder="닉네임을 입력하세요"
          placeholderTextColor="#555"
        />
      </View>

      {/* 3. 소개글 입력 */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>소개</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          value={intro} 
          onChangeText={setIntro}
          multiline
          // 포커스 잡히면 디폴트 텍스트 지워주는 기능 (선택사항 - 필요하면 주석 해제)
          /* onFocus={() => {
            if (intro === '당신에 대하여 소개해주세요') setIntro('');
          }}
          */
        />
      </View>

      {/* 4. 저장 버튼 */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
}

// 스타일
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A1E', padding: 20 },
  avatarSection: { alignItems: 'center', marginBottom: 30, marginTop: 10 },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1F1F35', justifyContent: 'center', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#2F2F4F' },
  changePhotoText: { color: '#8A2BE2', fontWeight: '600' },
  inputGroup: { marginBottom: 20 },
  label: { color: '#888899', marginBottom: 8, fontSize: 14 },
  input: { backgroundColor: '#1F1F35', color: '#fff', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#2F2F4F', fontSize: 16 },
  textArea: { height: 80, textAlignVertical: 'top' },
  saveButton: { backgroundColor: '#8A2BE2', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});