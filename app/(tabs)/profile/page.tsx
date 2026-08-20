import { Feather, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Aboutus } from '@/components/acout-us';
import { ChangePassword } from '@/components/change-password';
import { EmailNameChange } from '@/components/email-name-update';
import { FAQuestions } from '@/components/faquestions';
import MenuItem from '@/components/menu-item';
import { ProfileAvatar } from '@/components/profile-avatar';
import { SFeedback } from '@/components/sfeedback';
import { TwoFactorAuth } from '@/components/two-factor-auth';
import COLORS from '@/constants/color';
import { useAuth } from '@/context/use-auth';

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
    <View style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* User Profile Card */}
        <View style={styles.profileHeader}>
          <ProfileAvatar
            avatarUrl={user?.avatar}
            userName={user?.name || 'Bogale'}
            isVerified={true}
            size={110}
          />
          <Text style={styles.userName}>{user?.name}</Text>
          <View style={styles.emailContainer}>
            <Feather name="mail" size={14} color="#6B7280" />
            <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          </View>
        </View>

        {/* SECTION 1: Personal Details */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Personal Details</Text>
          <View style={styles.cardGroup}>
            <EmailNameChange>
              <MenuItem icon="user" title="Full Name" value={user?.name} />
            </EmailNameChange>
            <View style={styles.divider} />
            <EmailNameChange>
              <MenuItem icon="mail" title="Email" value={user?.email || 'user@example.com'} />
            </EmailNameChange>
          </View>
        </View>

        {/* SECTION 2: Account & Security */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Account & Security</Text>
          <View style={styles.cardGroup}>
            <ChangePassword />
            <View style={styles.divider} />
            <TwoFactorAuth />
          </View>
        </View>

        {/* SECTION 3: Support */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Support & Info</Text>
          <View style={styles.cardGroup}>
            <FAQuestions>
              <MenuItem icon="help-circle" title="Frequently Asked Questions" />
            </FAQuestions>

            <View style={styles.divider} />
            <SFeedback>
              <MenuItem icon="message-square" title="Submit Feedback" />
            </SFeedback>
            <View style={styles.divider} />
            <Aboutus>
              <MenuItem icon="info" title="About Us" />
            </Aboutus>
          </View>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <MaterialIcons name="logout" size={20} color="#EF4444" />
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>

        {/* App Version Info */}
        <Text style={styles.versionText}>App Version 1.0.0 (Build 104)</Text>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background || '#F9FAFB',
  },
  scrollContent: {
    paddingHorizontal: 12,
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
