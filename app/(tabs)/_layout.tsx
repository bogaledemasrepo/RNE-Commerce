import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return <Tabs>
    <Tabs.Screen name="home/page" options={{title:"Home",tabBarLabel:"Home",tabBarIcon:({color,focused,size})=><MaterialCommunityIcons name="home" color={color} size={size}/>}} />
    <Tabs.Screen name="profile/page" options={{title:"Profile",tabBarLabel:"Profile",tabBarIcon:({color,focused,size})=><MaterialCommunityIcons name="account" color={color} size={size}/>}}/>
  </Tabs>;
}
