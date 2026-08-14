import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { Platform, StyleSheet } from "react-native";

import COLORS from "@/constants/color";
import { useAuth } from "@/context/use-auth";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
  const { user } = useAuth();

  // Declarative protection: redirect to Sign In if user session doesn't exist
  if (!user) {
    return <Redirect href="/(auth)/sign-in/page" />;
  }

  return (<SafeAreaView style={{flex:1}}>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.primary || "#4830D3",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "bag-handle" : "bag-handle-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orders/page"
        options={{
          title: "Orders",
          tabBarLabel: "Orders",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "receipt" : "receipt-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    height: Platform.OS === "ios" ? 84 : 64,
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 24 : 8,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
});