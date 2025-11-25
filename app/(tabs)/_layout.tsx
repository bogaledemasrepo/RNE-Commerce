import { useAuth } from "@/context/use-auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { useEffect } from "react";

export default function TabsLayout() {
  const {user} = useAuth();
  useEffect(() => { 
    if (!user) {
      router.replace('/(auth)/sign-in/page');
      // Redirect or perform any action when the user is not authenticated
    }
    // You can add any authentication-related side effects here
  }, [user]);
  return <Tabs screenOptions={{tabBarStyle:{
    position:"absolute",
    bottom:0,
    width:"100%"
  },headerShown:false}}>
    <Tabs.Screen name="home" options={{title:"Home",tabBarLabel:"Home",tabBarIcon:({color,focused,size})=><MaterialCommunityIcons name="home" color={color} size={size}/>}} />
    <Tabs.Screen name="cart/page" options={{title:"Cart",tabBarLabel:"Cart",tabBarIcon:({color,focused,size})=><MaterialCommunityIcons name="cart" color={color} size={size}/>}} />
    <Tabs.Screen name="profile/page" options={{title:"Profile",tabBarLabel:"Profile",tabBarIcon:({color,focused,size})=><MaterialCommunityIcons name="account" color={color} size={size}/>}}/>
  </Tabs>;
}
