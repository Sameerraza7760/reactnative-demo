import { Stack } from "expo-router";
export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ title: "Home" }} />
      <Stack.Screen name="details" options={{ title: "User Details" }} />
    </Stack>
  );
}

