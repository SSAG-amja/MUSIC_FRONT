import { Redirect } from 'expo-router';
import React from 'react';

export default function Index() {
  // 앱 실행 시 바로 로그인 화면으로 이동합니다.
  return <Redirect href="/(auth)/login" />;
}