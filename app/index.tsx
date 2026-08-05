import { router } from "expo-router";
import {
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ToastManager from "toastify-react-native/components/ToastManager";

// Replace with your color constants file or update values
import COLORS from "@/constants/color";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Hero Background Image */}
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
        }}
        style={styles.heroBackground}
        resizeMode="cover"
      >
        <View style={styles.topHeader}>
          <Text style={styles.brandLogo}>FC-COMMERCE</Text>
        </View>
      </ImageBackground>

      {/* Bottom Floating Sheet */}
      <View style={styles.sheetContainer}>
        <View style={styles.contentGroup}>
          <Text style={styles.title}>Elevate Your Everyday Style</Text>
          <Text style={styles.subtitle}>
            Discover curated collections, exclusive drops, and a seamless shopping experience tailored for you.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.navigate("/(auth)/sign-in/page")}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.navigate("/(auth)/sign-in/page")}
          >
            <Text style={styles.secondaryButtonText}>
              Already have an account? <Text style={styles.linkText}>Sign In</Text>
            </Text>
          </Pressable>
        </View>

        <Pressable 
          style={styles.guestLink} 
          onPress={() => router.navigate("/(guest)/page")}
        >
          <Text style={styles.guestText}>Browse as Guest</Text>
        </Pressable>
      </View>

      <ToastManager />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  heroBackground: {
    flex: 1.2,
    justifyContent: "flex-start",
  },
  topHeader: {
    alignItems: "center",
    marginTop: 20,
  },
  brandLogo: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  sheetContainer: {
    flex: 1,
    backgroundColor: COLORS.background || "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -30,
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  contentGroup: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  actionContainer: {
    gap: 12,
    width: "100%",
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: "#4830D3",
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4830D3",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#4B5563",
    fontSize: 14,
    fontWeight: "500",
  },
  linkText: {
    color: "#4830D3",
    fontWeight: "700",
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  guestLink: {
    alignItems: "center",
    paddingVertical: 8,
  },
  guestText: {
    color: "#9CA3AF",
    fontSize: 13,
    fontWeight: "500",
  },
});