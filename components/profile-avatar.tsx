import { API_BASE_URL } from '@/constants';
import { useAuth } from '@/context/use-auth';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import * as FileSystem from 'expo-file-system/legacy';
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
  size = 100,
}: ProfileAvatarProps) {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  const handleUpdateAvatar = async (asset: ImagePicker.ImagePickerAsset) => {
    setLoading(true);
    try {
      const rawToken = await AsyncStorage.getItem('token');
      const token = rawToken ? rawToken.replace(/^Bearer\s+/i, '') : '';

      const uploadResult = await FileSystem.uploadAsync(`${API_BASE_URL}/users/me`, asset.uri, {
        httpMethod: 'PUT',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'avatar', // Must match Spring Boot @RequestParam("avatar")
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (uploadResult.status === 200) {
        const updatedUser = JSON.parse(uploadResult.body);
        setUser(updatedUser);
        Alert.alert('Success', 'Profile photo updated!');
      } else {
        console.error('Server error status:', uploadResult.status, uploadResult.body);
        Alert.alert('Error', `Upload failed with status ${uploadResult.status}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload image.');
    } finally {
      setLoading(false);
    }
  };
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0] ? parts[0][0].toUpperCase() : 'U';
  };

  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please allow access to your media library to update your profile picture.'
        );
        return;
      }

      // 3. Updated Expo ImagePicker API to fix deprecation warning
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await handleUpdateAvatar(result.assets[0]);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to select image.');
    }
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
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

        {loading && (
          <View style={[styles.loadingOverlay, { borderRadius: size / 2 }]}>
            <ActivityIndicator size="small" color="#FFFFFF" />
          </View>
        )}
      </View>

      <Pressable
        style={styles.editAvatarBtn}
        onPress={handlePickImage}
        disabled={loading}
        hitSlop={8}
        android_ripple={{ color: '#1E40AF', borderless: true }}
      >
        <Ionicons name="camera" size={16} color="#FFFFFF" />
      </Pressable>

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
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
