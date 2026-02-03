import { BASE_URL } from '@/constants/Urls';
import { useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';

// 서버에서 받을 데이터의 모양(Type) 정의
export interface WeatherResponse {
  location: {
    city: string;      
    district: string;  
    dong?: string;     
  };
  weather: {
    status: string;      
    temp: number;        
    description: string; 
    icon: string;        
  };
}

// [1] 실제 데이터를 가져오는 함수
const fetchWeatherAndLocation = async () => {
  console.log('📡 [자동 실행] 날씨와 위치 정보를 갱신합니다...');

  // 1. 위치 권한 확인
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('위치 권한이 거부되었습니다.');
  }

  // 2. 좌표 가져오기
  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;
  
  console.log(`📍 [2단계] 좌표 획득: ${latitude}, ${longitude}`);
  console.log(`🚀 [3단계] 백엔드로 요청 보냄: ${BASE_URL}/api/getLocWtr`);

  // 3. 백엔드 서버로 요청
  const response = await fetch(
    `${BASE_URL}/api/getLocWtr?lat=${latitude}&lon=${longitude}`, 
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('서버 통신 오류가 발생했습니다.');
  }

  const data = await response.json();
  console.log('✅ [4단계] 응답 수신 완료:', data);

  // 4. 진짜 데이터 반환
  return data;
};

// [2] 커스텀 훅
export const useWeatherQuery = () => {
  return useQuery<WeatherResponse>({ 
    queryKey: ['weather-info'], //저장될 표 이름
    queryFn: fetchWeatherAndLocation,
    refetchInterval: 1000 * 60 * 60, // 1시간
    refetchOnWindowFocus: true,
    retry: 1,
  });
};