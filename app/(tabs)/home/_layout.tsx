import { Stack } from 'expo-router';

function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="page" />
      <Stack.Screen name="detail/[slug]" />
    </Stack>
  );
}

export default HomeLayout;
