import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { AuthProvider } from "../context/AuthContext";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Efek samping untuk splash screen harus di dalam useEffect
export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  
  const [loaded, error] = useFonts({
    // 5 Font Statis
    MontserratItalic: require("../assets/fonts/Montserrat-Italic-VariableFont_wght.ttf"),
    OpenSansItalic: require("../assets/fonts/OpenSans-Italic-VariableFont_wdth,wght.ttf"),
    OpenSansVariable: require("../assets/fonts/OpenSans-VariableFont_wdth,wght.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    RalewayItalic: require("../assets/fonts/Raleway-Italic-VariableFont_wght.ttf"),

    // 5 Font Dinamis
    Lobster: require("../assets/fonts/Lobster-Regular.ttf"),
    SpaceMonoBoldItalic: require("../assets/fonts/SpaceMono-BoldItalic.ttf"),
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    IndieFlower: require("../assets/fonts/IndieFlower-Regular.ttf"),
    RobotoVariable: require("../assets/fonts/Roboto-VariableFont_wdth,wght.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        console.log('Fonts loaded:', loaded);
        console.log('Font error:', error);
        
        if (loaded || error) {
          // If fonts loaded or there's an error, the app is ready
          setAppIsReady(true);
        }
      } catch (e) {
        console.warn('Error during app preparation:', e);
        // Even if there's an error, make the app ready to prevent infinite loading
        setAppIsReady(true);
      }
    }

    prepare();
  }, [loaded, error]);

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (appIsReady) {
        try {
          await SplashScreen.hideAsync();
        } catch (e) {
          console.warn('Error hiding splash screen:', e);
        }
      }
    };

    hideSplashScreen();
  }, [appIsReady]);

  if (!appIsReady) {
    // Show a simple loading screen if app is not ready
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={{ marginTop: 20, fontSize: 16, color: '#666' }}>Loading...</Text>
      </View>
    );
  }

  // return (
  //   <Stack
  //     screenOptions={{
  //       header: ({ navigation }) => (
  //         <View
  //           style={{
  //             height: 60,
  //             backgroundColor: "#f8f8f8",
  //             justifyContent: "center",
  //             alignItems: "flex-start",
  //           }}
  //         >
  //           <TouchableOpacity
  //             style={{
  //               width: 60,
  //               marginLeft: 10,
  //             }}
  //             onPress={() => navigation.navigate("index")} // atau sesuaikan nama route-nya
  //           >
  //             <Entypo name="home" size={24} color="black" />
  //           </TouchableOpacity>
  //         </View>
  //       ),
  //     }}
  //   />
  // );

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
