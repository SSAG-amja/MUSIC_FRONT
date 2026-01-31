import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
//useFocusEffect 추가
import { Link, useRouter, useFocusEffect } from 'expo-router';
//useCallback 추가
import React, { useState, useCallback } from 'react'; 
import { Alert, Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

// SecureStore 임포트
import * as SecureStore from 'expo-secure-store';

// 서버 주소 가져오기
import { BASE_URL } from '@/constants/Urls';

// 디자인 상수 (전역 테마 일치)
const COLORS = {
  background: '#0A0A1E',
  card: '#1F1F35',
  accent: '#8A2BE2',
  spotify: '#1DB954',
  textPrimary: '#FFFFFF',
  textSecondary: '#888899',
  border: '#2F2F4F',
  danger: '#FF4757',
};

export default function UserProfileScreen() {
  const router = useRouter();

  // 유저 정보를 담을 상태 변수
  const [userInfo, setUserInfo] = useState({
    name: '로딩 중...',
    email: ''
  });

  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);
  const [isPushEnabled, setIsPushEnabled] = useState(true);
  //260131 임재준
  // useEffect -> useFocusEffect로 변경
  // 화면이 다시 포커스될 때마다(뒤로가기로 돌아왔을 때 포함) 실행됨
  useFocusEffect(
    useCallback(() => {
      const fetchUserInfo = async () => {
        try {
          // 1. 저장된 토큰 꺼내기
          const token = await SecureStore.getItemAsync('userToken');
          if (!token) return;

          // 2. 서버에 '내 정보' 요청하기
          const response = await fetch(`${BASE_URL}/api/v1/users/me`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log("👤 내 정보 갱신 완료:", data);
            
            // 3. 상태 업데이트 (화면 리렌더링)
            setUserInfo({
              name: data.username || data.full_name || '이름 없음', 
              email: data.email || ''
            });
          } else {
            console.log("불러오기 실패:", response.status);
          }
        } catch (error) {
          console.error("내 정보 가져오기 에러:", error);
        }
      };

      fetchUserInfo();
    }, []) // useCallback의 의존성 배열은 비워둡니다.
  );

  const handleSpotifyConnect = () => {
    if (isSpotifyConnected) {
      Alert.alert('연동 해제', 'Spotify 연결을 해제하시겠습니까?', [
        { text: '취소', style: 'cancel' },
        { text: '해제', onPress: () => setIsSpotifyConnected(false), style: 'destructive' },
      ]);
    } else {
      Alert.alert('Spotify 연동', 'Spotify 로그인 화면으로 이동합니다.', [
        { text: '확인', onPress: () => setIsSpotifyConnected(true) },
      ]);
    }
  };

  // 수사용 handleLogout (범인 색출용)
  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { 
        text: '로그아웃', 
        style: 'destructive',
        onPress: async () => {
          try {
            console.log('🕵️ [디버깅] 로그아웃 시도 중...');

            const checkBefore = await SecureStore.getItemAsync('userToken');
            
            if (!checkBefore) {
               console.warn("⚠️ 경고: 삭제할 토큰이 없습니다!");
            }

            await SecureStore.deleteItemAsync('userToken');
            
            const checkAfter = await SecureStore.getItemAsync('userToken');

            if (!checkAfter) {
                console.log('✅ 로그아웃 성공! 로그인 화면으로 이동합니다.');
                router.replace('/signin'); 
            } else {
                Alert.alert('오류', '토큰이 끈질기게 남아있습니다.');
            }
            
          } catch (error) {
            console.error('❌ 에러 발생:', error);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* 1. 프로필 헤더 섹션 */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.avatar} 
          />
          <TouchableOpacity style={styles.editAvatarBadge}>
            <Ionicons name="camera" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
        
        {/* 받아온 userInfo 값 표시 */}
        <Text style={styles.userName}>{userInfo.name}</Text>
        <Text style={styles.userEmail}>{userInfo.email}</Text>
        
        <Link href="/useredit" asChild>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>프로필 편집</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* 2. Spotify 연동 섹션 */}
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
          
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => router.push('/useredit')} 
          >
            <View style={styles.rowLeft}>
              <Ionicons name="person-outline" size={22} color={COLORS.textPrimary} />
              <Text style={styles.menuText}>회원정보 수정</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.rowLeft}>
              <Ionicons name="lock-closed-outline" size={22} color={COLORS.textPrimary} />
              <Text style={styles.menuText}>계정</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. 앱 설정 섹션 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        <View style={styles.card}>
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
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
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
    backgroundColor: '#333',
  },
  connectButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
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