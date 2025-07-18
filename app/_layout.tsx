import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Mencegah splash screen langsung menghilang
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    if (loaded && !error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return <Stack />;
}
