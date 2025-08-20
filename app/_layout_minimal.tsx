import { Stack } from "expo-router";

// ULTRA MINIMAL MODE - Remove ALL potential issues
export default function RootLayout() {
  
  // No splash screen, no effects, no providers - just basic navigation
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="auth"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}
