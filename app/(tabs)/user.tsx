import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, useRouter } from 'expo-router'; // [수정] Link 추가
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

// 디자인 상수 (전역 테마 일치)
const COLORS = {
  background: '#0A0A1E',
  card: '#1F1F35',
  accent: '#8A2BE2', // Neon Purple
  spotify: '#1DB954', // Spotify Official Green
  textPrimary: '#FFFFFF',
  textSecondary: '#888899',
  border: '#2F2F4F',
  danger: '#FF4757',
};

export default function UserProfileScreen() {
  const router = useRouter();

  // 상태 관리 예시
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);
  const [isPushEnabled, setIsPushEnabled] = useState(true);

  // Spotify 연동 핸들러
  const handleSpotifyConnect = () => {
    if (isSpotifyConnected) {
      Alert.alert('연동 해제', 'Spotify 연결을 해제하시겠습니까?', [
        { text: '취소', style: 'cancel' },
        { text: '해제', onPress: () => setIsSpotifyConnected(false), style: 'destructive' },
      ]);
    } else {
      // 실제로는 여기서 Spotify Auth URL로 이동합니다.
      Alert.alert('Spotify 연동', 'Spotify 로그인 화면으로 이동합니다.', [
        { text: '확인', onPress: () => setIsSpotifyConnected(true) },
      ]);
    }
  };

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { 
        text: '로그아웃', 
        onPress: () => {
          // TODO: 로그아웃 로직 (토큰 삭제 등)
          router.replace('/'); // 랜딩 페이지로 이동
        },
        style: 'destructive' 
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* 1. 프로필 헤더 섹션 */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/150' }} // 임시 이미지
            style={styles.avatar} 
          />
          <TouchableOpacity style={styles.editAvatarBadge}>
            <Ionicons name="camera" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>임재준</Text>
        <Text style={styles.userEmail}>jaejun@kangwon.ac.kr</Text>
        
        {/* [핵심 수정 부분] Link 컴포넌트로 버튼 감싸기 */}
        <Link href="/profile-edit" asChild>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>프로필 편집</Text>
          </TouchableOpacity>
        </Link>

      </View>

      {/* 2. Spotify 연동 섹션 (강조됨) */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Service Integration</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <AntDesign name="spotify" size={24} color="white" />
              <View style={{ marginLeft: 15 }}>
                <Text style={styles.itemTitle}>Spotify</Text>
                <Text style={styles.itemSubtitle}>
                  {isSpotifyConnected ? '연동되었습니다' : '계정을 연결하고 음악을 추천받으세요'}
                </Text>
              </View>
            </View>
            <TouchableOpacity 
              style={[styles.connectButton, isSpotifyConnected && styles.connectedButton]}
              onPress={handleSpotifyConnect}
            >
              <Text style={styles.connectButtonText}>
                {isSpotifyConnected ? '해제' : '연동'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 3. 계정 설정 섹션 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          
          {/* 회원정보 수정 */}
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log('회원정보 수정')}>
            <View style={styles.rowLeft}>
              <Ionicons name="person-outline" size={22} color={COLORS.textPrimary} />
              <Text style={styles.menuText}>회원정보 수정</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* 비밀번호 변경 */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.rowLeft}>
              <Ionicons name="lock-closed-outline" size={22} color={COLORS.textPrimary} />
              <Text style={styles.menuText}>비밀번호 변경</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. 앱 설정 섹션 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        <View style={styles.card}>
          {/* 알림 설정 */}
          <View style={styles.menuItem}>
            <View style={styles.rowLeft}>
              <Ionicons name="notifications-outline" size={22} color={COLORS.textPrimary} />
              <Text style={styles.menuText}>알림 설정</Text>
            </View>
            <Switch 
              value={isPushEnabled}
              onValueChange={setIsPushEnabled}
              trackColor={{ false: '#333', true: COLORS.accent }}
              thumbColor={'#FFF'}
            />
          </View>
        </View>
      </View>

      {/* 5. 로그아웃 / 탈퇴 */}
      <View style={[styles.sectionContainer, { marginBottom: 40 }]}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteAccountButton}>
          <Text style={styles.deleteAccountText}>회원 탈퇴</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // --- 프로필 헤더 스타일 ---
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: COLORS.background,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  editAvatarBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.accent,
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  editProfileButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  editProfileText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },

  // --- 섹션 공통 스타일 ---
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 10,
    marginLeft: 5,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 5, // 내부 아이템 간격을 위해
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  
  // --- 리스트 아이템 스타일 ---
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginLeft: 15,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },

  // --- Spotify 카드 전용 스타일 ---
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  itemSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  connectButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  connectedButton: {
    backgroundColor: '#333', // 연결되었을 땐 회색으로
  },
  connectButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // --- 하단 버튼 스타일 ---
  logoutButton: {
    backgroundColor: COLORS.card,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logoutText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: '600',
  },
  deleteAccountButton: {
    alignItems: 'center',
    padding: 10,
  },
  deleteAccountText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});