import { Stack } from 'expo-router';

export default function WorkerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="gigs" />
      <Stack.Screen name="job" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
