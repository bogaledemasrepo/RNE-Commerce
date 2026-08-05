import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import COLORS from '@/constants/color';
import { useAuth } from '@/context/use-auth';

interface MenuItemProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  value?: string;
  onPress: () => void;
  isDestructive?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  value,
  onPress,
  isDestructive = false,
}) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.menuItemLeft}>
      <View
        style={[
          styles.iconBadge,
          isDestructive && styles.iconBadgeDestructive,
        ]}
      >
        <Feather
          name={icon}
          size={18}
          color={isDestructive ? '#EF4444' : COLORS.primary || '#4830D3'}
        />
      </View>
      <Text
        style={[
          styles.menuItemTitle,
          isDestructive && styles.menuItemTitleDestructive,
        ]}
      >
        {title}
      </Text>
    </View>

    <View style={styles.menuItemRight}>
      {value && <Text style={styles.menuItemValue}>{value}</Text>}
      <FontAwesome
        name="angle-right"
        size={18}
        color="#9CA3AF"
      />
    </View>
  </TouchableOpacity>
);

const Profile = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out of your account?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          logout?.();
          router.replace('/(auth)/sign-in/page' as any);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Title */}
        {/* <View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>Profile</Text>
        </View> */}

        {/* User Profile Card */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrapper}>
            <Image
              style={styles.avatarImage}
              resizeMode="cover"
              source={require('../../../assets/images/man.png')}
            />
            <Pressable style={styles.editAvatarBtn} hitSlop={6}>
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </Pressable>
          </View>

          <Text style={styles.userName}>{user?.username || 'John Doe'}</Text>
          <View style={styles.emailContainer}>
            <Feather name="mail" size={14} color="#6B7280" />
            <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          </View>
        </View>

        {/* SECTION 1: Personal Details */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Personal Details</Text>
          <View style={styles.cardGroup}>
            <MenuItem
              icon="user"
              title="Full Name"
              value={user?.username || 'John Doe'}
              onPress={() => router.navigate('/(tabs)/profile/edit-name' as any)}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="mail"
              title="Email Address"
              value={user?.email || 'user@example.com'}
              onPress={() => router.navigate('/(tabs)/profile/edit-email' as any)}
            />
          </View>
        </View>

        {/* SECTION 2: Account & Security */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Account & Security</Text>
          <View style={styles.cardGroup}>
            <MenuItem
              icon="lock"
              title="Change Password"
              onPress={() => router.navigate('/(tabs)/profile/change-password' as any)}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="shield"
              title="Two-Factor Auth"
              value="Disabled"
              onPress={() => router.navigate('/(tabs)/profile/2fa' as any)}
            />
          </View>
        </View>

        {/* SECTION 3: Support */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Support & Info</Text>
          <View style={styles.cardGroup}>
            <MenuItem
              icon="help-circle"
              title="Frequently Asked Questions"
              onPress={() => router.navigate('/(tabs)/profile/faq' as any)}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="message-square"
              title="Submit Feedback"
              onPress={() => router.navigate('/(tabs)/profile/feedback' as any)}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="info"
              title="About Us"
              onPress={() => router.navigate('/(tabs)/profile/about' as any)}
            />
          </View>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <MaterialIcons name="logout" size={20} color="#EF4444" />
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>

        {/* App Version Info */}
        <Text style={styles.versionText}>App Version 1.0.0 (Build 104)</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background || '#F9FAFB',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 60,
  },
  screenHeader: {
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E5E7EB',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    // Elevation for Android / Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: COLORS.primary || '#4830D3',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  cardGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(72, 48, 211, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBadgeDestructive: {
    backgroundColor: '#FEF2F2',
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  menuItemTitleDestructive: {
    color: '#EF4444',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuItemValue: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 64, // Aligns divider with text right after icon badge
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    marginTop: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 20,
  },
});