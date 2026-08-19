import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface ProfileAvatarProps {
  avatarUrl?: string | null;
  userName?: string;
  isVerified?: boolean;
  onAvatarChange?: (imageUri: string) => Promise<void> | void;
  size?: number;
}

export function ProfileAvatar({
  avatarUrl,
  userName = 'User',
  isVerified = true,
  onAvatarChange,
  size = 100,
}: ProfileAvatarProps) {
  const [loading, setLoading] = useState(false);

  // Extract initials for fallback avatar (e.g., "John Doe" -> "JD")
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0] ? parts[0][0].toUpperCase() : 'U';
  };

  // Image Picker Logic with Permission Request
  const handlePickImage = async () => {
    try {
      // 1. Request Media Library Permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please allow access to your media library to update your profile picture.'
        );
        return;
      }

      // 2. Open Native Image Picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Square crop
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        const selectedUri = result.assets[0].uri;

        // 3. Trigger Async Upload Callback
        if (onAvatarChange) {
          setLoading(true);
          await onAvatarChange(selectedUri);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* --- Main Avatar Frame --- */}
      <View style={[styles.avatarRing, { borderRadius: size / 2 }]}>
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={[styles.avatarImage, { borderRadius: size / 2 }]}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.fallbackContainer, { borderRadius: size / 2 }]}>
            <Text style={[styles.initialsText, { fontSize: size * 0.35 }]}>
              {getInitials(userName)}
            </Text>
          </View>
        )}

        {/* Upload Loading Overlay */}
        {loading && (
          <View style={[styles.loadingOverlay, { borderRadius: size / 2 }]}>
            <ActivityIndicator size="small" color="#FFFFFF" />
          </View>
        )}
      </View>

      {/* --- Edit Action Button --- */}
      <Pressable
        style={styles.editAvatarBtn}
        onPress={handlePickImage}
        disabled={loading}
        hitSlop={8}
        android_ripple={{ color: '#1E40AF', borderless: true }}
      >
        <Ionicons name="camera" size={16} color="#FFFFFF" />
      </Pressable>

      {/* --- Verified Badge Indicator --- */}
      {isVerified && (
        <View style={styles.verifiedBadge}>
          <MaterialIcons name="verified-user" size={12} color="#FFFFFF" />
        </View>
      )}
    </View>
  );
}

const PRIMARY_BLUE = '#2563EB';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
  },
  avatarRing: {
    width: '100%',
    height: '100%',
    padding: 3,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  fallbackContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontWeight: '700',
    color: PRIMARY_BLUE,
    letterSpacing: 0.5,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: PRIMARY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  verifiedBadge: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#10B981', // Emerald Verified Green
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
