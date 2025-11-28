import { useAuth } from "@/context/use-auth";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
 const {user}= useAuth();
  useEffect(() => {
    if (user) {
      router.replace('/(tabs)/home/page');
      // Redirect or perform any action when the user is authenticated
    }
    // You can add any authentication-related side effects here
  }, [user]);
  return <Stack screenOptions={{headerShown:false}}/>;
}
