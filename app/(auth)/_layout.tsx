import { useAuth } from '@/context/use-auth';
import { router, Stack } from 'expo-router';
import { useEffect } from 'react';

export default function AuthLayout() {
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      router.replace('/(tabs)/home/page');
    }
  }, [user]);
  return <Stack screenOptions={{ headerShown: false }} />;
}
