import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ActivityIndicator //로딩 컴포넌트 추가
  ,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

//백엔드 통신을 위한 라이브러리 추가
import { BASE_URL } from '@/constants/Urls';
import * as SecureStore from 'expo-secure-store';

// 더미 데이터 (나중에 API로 받아올 수 있음)
const GENRES = [
  { id: '1', name: 'K-Pop', emoji: '🎵' },
  { id: '2', name: 'Hip Hop', emoji: '🎤' },
  { id: '3', name: 'R&B', emoji: '🍸' },
  { id: '4', name: 'Rock', emoji: '🎸' },
  { id: '5', name: 'Indie', emoji: '☕' },
  { id: '6', name: 'Jazz', emoji: '🎷' },
  { id: '7', name: 'Electronic', emoji: '⚡' },
  { id: '8', name: 'Classical', emoji: '🎻' },
  { id: '9', name: 'Pop', emoji: '🎉' },
  { id: '10', name: 'Acoustic', emoji: '🍂' },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); //로딩 상태 관리

  // 장르 선택/해제 토글 로직
  const toggleGenre = (id: string) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(prev => prev.filter(item => item !== id));
    } else {
      setSelectedGenres(prev => [...prev, id]);
    }
  };

  // ✅ 완료 버튼 핸들러 (백엔드 연동)
  const handleComplete = async () => {
    if (selectedGenres.length < 3) {
      Alert.alert('알림', '정확한 추천을 위해 3개 이상 선택해주세요.');
      return;
    }
    //260131 임재준
    //토큰값이 True이면 온보딩 화면,아니면 tabs로 라우팅
    //온보딩 화면 선택 후 is_newer false 수정 요청
    try {
      setLoading(true); // 로딩 시작
      
      // 1. 토큰 가져오기
      const token = await SecureStore.getItemAsync('userToken');
      if (!token) {
        Alert.alert("오류", "로그인 정보가 없습니다.");
        router.replace('/signin');
        return;
      }

      console.log('🚀 장르 저장 시작:', selectedGenres);

      // 2. 선택된 장르 ID를 실제 객체 정보로 변환
      const selectedGenreObjects = GENRES.filter(g => selectedGenres.includes(g.id));

      // 3. [핵심] 여러 개의 장르를 동시에 저장 (Promise.all)
      // 백엔드 API가 한 번에 1개씩만 받으므로, map으로 여러 요청을 만듭니다.
      const savePromises = selectedGenreObjects.map(genre => {
        // ⚠️ 주의: main.py 라우터 설정에 따라 주소가 다를 수 있음 (/api/v1/user_data/genres 등)
        return fetch(`${BASE_URL}/api/v1/user_data/genres`, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          // 백엔드 GenreCreate 스키마 (genre_code, genre_name)
          body: JSON.stringify({
            genre_code: genre.id,
            genre_name: genre.name
          })
        });
      });

      await Promise.all(savePromises);
      console.log("✅ 모든 장르 저장 완료!");

      // 4. [핵심] 온보딩 완료 처리 (신규 유저 딱지 떼기)
      console.log("🚀 신규 유저 상태 해제 요청...");
      const completeResponse = await fetch(`${BASE_URL}/api/v1/users/onboarding/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (completeResponse.ok) {
        console.log("🎉 온보딩 졸업! 메인으로 이동");
        router.replace('/(tabs)');
      } else {
        console.log("⚠️ 온보딩 완료 처리 실패");
        Alert.alert("오류", "완료 처리에 실패했습니다.");
      }

    } catch (error) {
      console.error("오류 발생:", error);
      Alert.alert("오류", "서버와 통신 중 문제가 발생했습니다.");
    } finally {
      setLoading(false); // 로딩 끝
    }
  };

  const renderItem = ({ item }: { item: typeof GENRES[0] }) => {
    const isSelected = selectedGenres.includes(item.id);
    
    return (
      <TouchableOpacity 
        style={[
          styles.card, 
          isSelected && styles.cardSelected // 선택되었을 때 스타일 덮어쓰기
        ]} 
        onPress={() => toggleGenre(item.id)}
        activeOpacity={0.8}
      >
        <Text style={styles.cardEmoji}>{item.emoji}</Text>
        <Text style={[
          styles.cardText, 
          isSelected && styles.cardTextSelected
        ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          
          {/* 헤더 섹션 */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>취향 선택</Text>
            <Text style={styles.subtitle}>
              좋아하는 장르를 3개 이상 선택하면{'\n'}
              <Text style={styles.highlightText}>Music Match</Text>가 분석해드려요
            </Text>
          </View>

          {/* 장르 선택 리스트 (그리드) */}
          <FlatList
            data={GENRES}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2} // 2열 배치
            columnWrapperStyle={styles.row} // 열 간 간격 처리
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          {/* 하단 완료 버튼 */}
          <View style={styles.footerContainer}>
            <TouchableOpacity 
              style={[
                styles.completeButton,
                selectedGenres.length < 3 && styles.completeButtonDisabled // 비활성화 스타일
              ]} 
              onPress={handleComplete}
              disabled={selectedGenres.length < 3 || loading} // 로딩 중이거나 3개 미만이면 클릭 불가
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.completeButtonText}>
                  {selectedGenres.length}개 선택됨 • 시작하기
                </Text>
              )}
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1E', // 메인 배경색
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  
  // 헤더 스타일
  headerContainer: {
    marginBottom: 30,
    alignItems: 'flex-start', // 왼쪽 정렬
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888899',
    lineHeight: 24,
  },
  highlightText: {
    color: '#8A2BE2', // 강조색
    fontWeight: 'bold',
  },

  // 리스트 스타일
  listContent: {
    paddingBottom: 100, // 하단 버튼 공간 확보
  },
  row: {
    justifyContent: 'space-between', // 카드 사이 간격 균등 분배
    marginBottom: 16,
  },

  // 카드(칩) 스타일
  card: {
    width: '48%', // 2열이므로 약 50%
    height: 100, // 카드 높이
    backgroundColor: '#1F1F35', // 비활성 배경 (Input과 동일)
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2F2F4F', // 은은한 테두리
  },
  cardSelected: {
    backgroundColor: '#8A2BE2', // 선택 시 활성 컬러 (보라색)
    borderColor: '#8A2BE2',
    // 네온 효과 추가
    shadowColor: "#8A2BE2",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
  },
  cardEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888899', // 비활성 텍스트
  },
  cardTextSelected: {
    color: '#FFFFFF', // 활성 텍스트
    fontWeight: 'bold',
  },

  // 하단 버튼 스타일 (LoginScreen과 통일)
  footerContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  completeButton: {
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
  },
  completeButtonDisabled: {
    backgroundColor: '#2F2F4F', // 비활성화 시 어두운 회색
    shadowOpacity: 0,
    elevation: 0,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});