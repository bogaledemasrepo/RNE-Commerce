import { AuthProvider } from "@/context/use-auth";
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (<>
    <AuthProvider>
      <Stack screenOptions={{headerShown:false,}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(model)" />
    </Stack>
    </AuthProvider>
  </>)
}
