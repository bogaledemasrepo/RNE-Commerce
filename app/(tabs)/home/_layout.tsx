import { Stack } from 'expo-router';

function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="page" />
      <Stack.Screen name="detail/[slug]" />
      <Stack.Screen
        name="notifications/page"
        options={{
          title: 'Notifications',
          headerShown: false, // Hidden to use custom header bar with back button inside checkout
          animation: 'slide_from_right', // Native transition effect
        }}
      />
    </Stack>
  );
}

export default HomeLayout;
