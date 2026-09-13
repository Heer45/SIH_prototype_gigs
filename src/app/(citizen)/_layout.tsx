import { Stack } from 'expo-router';

export default function CitizenLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="services" />
      <Stack.Screen name="booking" />
      <Stack.Screen name="worker-match" />
      <Stack.Screen name="ai-match" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="payment-success" />
      <Stack.Screen name="community" />
      <Stack.Screen name="ai-analysis" />
      <Stack.Screen name="tracking" />
      <Stack.Screen name="verification" />
      <Stack.Screen name="civic-score" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
