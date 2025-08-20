import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { AuthProvider } from "../context/AuthContext";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// EMERGENCY MODE - Bypass all font loading for debugging Android issue
export default function RootLayout() {
  
  // Hide splash screen immediately without waiting for fonts
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync().catch(console.warn);
    }, 100); // Very short delay
    
    return () => clearTimeout(timer);
  }, []);

  return(
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
            name= "(tabs)"
            options={{
              headerShown: false
            }}
          />
        </Stack>
      </ErrorBoundary>
    </AuthProvider>
  )
}
