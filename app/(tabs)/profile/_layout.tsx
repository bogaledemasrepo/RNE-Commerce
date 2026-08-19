import COLORS from '@/constants/color';
import { Stack } from 'expo-router';

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerShadowVisible: false,
        headerTintColor: '#111827',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
        },
        contentStyle: {
          backgroundColor: COLORS.background || '#F9FAFB',
        },
      }}
    >
      {/* Primary Cart Screen */}
      <Stack.Screen
        name="page"
        options={{
          title: 'Profile',
          headerShown: false, // Hidden if page component renders its own custom SafeAreaView header
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
