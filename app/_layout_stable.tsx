import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { AuthProvider } from "../context/AuthContext";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// STABLE PRODUCTION LAYOUT - Optimized for reliability
export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  
  // Load only essential fonts with error handling
  const [loaded, error] = useFonts({
    // Essential fonts only
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    OpenSansVariable: require("../assets/fonts/OpenSans-VariableFont_wdth,wght.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn('Error hiding splash screen:', e);
      }
    }
  }, [appIsReady]);

  useEffect(() => {
    async function prepare() {
      try {
        // Wait for fonts or timeout after 3 seconds
        const fontPromise = new Promise((resolve) => {
          if (loaded || error) {
            resolve(true);
          } else {
            // Timeout fallback
            setTimeout(() => resolve(true), 3000);
          }
        });

        await fontPromise;
        setAppIsReady(true);
      } catch (e) {
        console.warn('Error during app preparation:', e);
        setAppIsReady(true);
      }
    }

    prepare();
  }, [loaded, error]);

  if (!appIsReady) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#fff' 
      }}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={{ 
          marginTop: 20, 
          fontSize: 16, 
          color: '#666',
          textAlign: 'center'
        }}>Starting AKB Fashion...</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      <ErrorBoundary>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
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
        </View>
      </ErrorBoundary>
    </AuthProvider>
  );
}
