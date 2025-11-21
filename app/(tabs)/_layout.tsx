import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
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
