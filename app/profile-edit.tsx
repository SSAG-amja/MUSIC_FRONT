// app/profile-edit.tsx
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProfileEditScreen() {
  const router = useRouter();

  // 실제로는 여기서 DB에 저장된 기존 닉네임을 초기값으로 불러와야 합니다.
  const [nickname, setNickname] = useState('임재준'); 
  const [intro, setIntro] = useState('음악을 사랑하는 개발자');

  const handleSave = async () => {
    // 1. 유효성 검사 (빈 값 체크 등)
    if (!nickname.trim()) {
      Alert.alert('오류', '닉네임을 입력해주세요.');
      return;
    }

    try {
      // 2. [핵심] 백엔드(DB) 업데이트 요청
      // 예시: await supabase.from('profiles').update({ nickname, intro }).eq('id', user.id);
      
      console.log('저장 요청:', nickname, intro);

      // 3. 성공 시 뒤로가기 (알림 표시)
      Alert.alert('완료', '프로필이 수정되었습니다.', [
        { text: '확인', onPress: () => router.back() } 
      ]);
    } catch (error) {
      Alert.alert('오류', '저장에 실패했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      {/* 헤더 설정: '취소' 버튼과 타이틀 */}
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
        />
      </View>

      {/* 4. 저장 버튼 */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
}

// 스타일 (user.tsx와 통일감 있게)
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