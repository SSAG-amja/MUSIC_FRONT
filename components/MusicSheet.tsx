import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform, // ✅ 안드로이드 체크용
  StatusBar as NativeStatusBar // ✅ 안드로이드 상단바 높이용
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ✅ [1] 안전 영역 훅 가져오기
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

const COLORS = {
  background: '#0A0A1E',
  card: '#111122',
  textPrimary: '#FFFFFF',
  textSecondary: '#888899',
};

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function MusicSheet({ visible, onClose }: Props) {
  const translateY = useRef(new Animated.Value(height)).current;

  // ✅ [2] 노치 높이 가져오기
  const insets = useSafeAreaInsets();

  // ✅ [3] 상단 패딩 계산 (안드로이드/iOS 대응)
  // 안드로이드는 insets.top이 0일 수 있어서 기기 값을 직접 가져옵니다.
  const topPadding = Platform.OS === 'android' 
    ? NativeStatusBar.currentHeight || 0 
    : insets.top;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : height,
      duration: 320,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY }] },
        // ✅ [4] 계산된 높이만큼 상단에 패딩 주기
        { paddingTop: topPadding }
      ]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="chevron-down" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* 플레이리스트 */}
      <View style={styles.content}>
        {[
          'Midnight Rain · Taylor Swift',
          'Nights · Frank Ocean',
          'After Dark · Drake',
        ].map((song, i) => (
          <View key={i} style={styles.songCard}>
            <Text style={styles.songText}>{song}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.background,
    zIndex: 200,
    // paddingTop은 위에서 동적으로 처리함
  },
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red', // 영역 확인용 (필요시 주석 해제)
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  songCard: {
    backgroundColor: COLORS.card,
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
  },
  songText: {
    color: COLORS.textPrimary,
    fontSize: 14,
  },
});