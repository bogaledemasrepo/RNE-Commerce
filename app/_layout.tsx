import { AuthProvider } from "@/context/use-auth";
import { Stack } from "expo-router";
import ToastManager from "toastify-react-native/components/ToastManager";

export default function RootLayout() {
  return (<>
    <AuthProvider>
      <Stack screenOptions={{headerShown:false,}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(model)" />
      <Stack.Screen name="(guest)/page" />
    </Stack>
    </AuthProvider>
    <ToastManager />
  </>)
}
