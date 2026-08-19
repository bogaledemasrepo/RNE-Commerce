import { AuthProvider } from '@/context/use-auth';
import { CartProvider } from '@/context/use-cart';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import ToastManager from 'toastify-react-native/components/ToastManager';

export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(model)" />
            <Stack.Screen name="(guest)/page" />
          </Stack>
        </CartProvider>
      </AuthProvider>
      <StatusBar style="light" />
      <ToastManager />
    </>
  );
}
