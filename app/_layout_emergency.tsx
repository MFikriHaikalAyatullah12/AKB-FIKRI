import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { AuthProvider } from "../context/AuthContext";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// EMERGENCY MODE - Bypass all font loading for debugging
export default function RootLayoutEmergency() {
  
  // Hide splash screen immediately
  useEffect(() => {
    SplashScreen.hideAsync().catch(console.warn);
  }, []);

  return (
    <AuthProvider>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </AuthProvider>
  );
}
